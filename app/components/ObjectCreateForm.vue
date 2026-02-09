<template>
  <section class="rounded-lg border border-border bg-card p-4 shadow-xs">
    <div class="flex flex-col gap-2">
      <h2 class="text-lg font-semibold">Create object</h2>
      <p class="text-sm text-muted-foreground">
        Enter object details and generate a unique QR code.
      </p>
    </div>

    <form class="mt-4 space-y-4" @submit.prevent="handleSubmit">
      <div class="space-y-2">
        <label class="text-sm font-medium" for="object-name">Object name</label>
        <input
          id="object-name"
          v-model.trim="form.name"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          type="text"
          placeholder="e.g. Pallet A"
          autocomplete="off"
        />
        <p v-if="errors.name" class="text-xs text-destructive">{{ errors.name }}</p>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium" for="object-id">Object ID</label>
        <input
          id="object-id"
          v-model.trim="form.objectId"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          type="text"
          placeholder="Leave empty to auto-generate"
          autocomplete="off"
        />
        <p v-if="errors.objectId" class="text-xs text-destructive">{{ errors.objectId }}</p>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium" for="object-description">Description (optional)</label>
        <textarea
          id="object-description"
          v-model.trim="form.description"
          class="min-h-[90px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Short description"
        />
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <UiButton type="submit" :loading="isSubmitting" icon="lucide:qr-code" icon-placement="left">
          Generate QR code
        </UiButton>
        <UiButton type="button" variant="ghost" icon="lucide:rotate-ccw" @click="resetForm">
          Reset
        </UiButton>
        <span v-if="successMessage" class="text-sm text-muted-foreground">
          {{ successMessage }}
        </span>
      </div>
    </form>

    <div v-if="latestObject" class="mt-6">
      <ObjectQrCard
        :name="latestObject.name"
        :object-id="latestObject.id"
        :qr-data-url="latestObject.qrDataUrl"
        :description="latestObject.description"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { toDataURL } from "qrcode";
  import type { StoredObject } from "~/composables/useObjects";

  const { addObject, generateUniqueId, isUniqueId, loadObjects } = useObjects();

  const form = reactive({
    name: "",
    objectId: "",
    description: "",
  });

  const errors = reactive<{ name?: string; objectId?: string }>({});
  const isSubmitting = ref(false);
  const latestObject = ref<StoredObject | null>(null);
  const successMessage = ref("");

  onMounted(() => {
    loadObjects();
  });

  const resetErrors = () => {
    errors.name = undefined;
    errors.objectId = undefined;
  };

  const resetForm = () => {
    form.name = "";
    form.objectId = "";
    form.description = "";
    latestObject.value = null;
    successMessage.value = "";
    resetErrors();
  };

  const validateForm = () => {
    resetErrors();

    if (!form.name.trim()) {
      errors.name = "Object name is required.";
    }

    if (form.objectId && !isUniqueId(form.objectId)) {
      errors.objectId = "Object ID already exists.";
    }

    return !errors.name && !errors.objectId;
  };

  const createObject = async () => {
    const objectId = form.objectId ? form.objectId : generateUniqueId();
    if (!objectId) {
      errors.objectId = "Unable to generate a unique ID.";
      return null;
    }

    const qrDataUrl = await toDataURL(objectId, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 240,
    });

    const item: StoredObject = {
      id: objectId,
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      qrDataUrl,
      createdAt: new Date().toISOString(),
    };

    addObject(item);
    return item;
  };

  const handleSubmit = async () => {
    successMessage.value = "";

    if (!validateForm()) return;

    isSubmitting.value = true;
    try {
      const created = await createObject();
      if (created) {
        latestObject.value = created;
        successMessage.value = "QR code generated and stored.";
        form.objectId = "";
        form.description = "";
      }
    } finally {
      isSubmitting.value = false;
    }
  };
</script>
