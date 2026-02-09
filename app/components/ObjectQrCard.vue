<template>
  <div class="rounded-lg border border-border bg-card p-4 shadow-xs">
    <div class="flex flex-col gap-4 md:flex-row md:items-center">
      <div class="flex shrink-0 items-center justify-center rounded-md border border-border bg-white p-3">
        <img :src="qrDataUrl" :alt="`QR Code for ${objectId}`" class="size-40" />
      </div>
      <div class="flex-1 space-y-2">
        <div>
          <p class="text-sm text-muted-foreground">Object name</p>
          <p class="text-base font-medium">{{ name }}</p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">Object ID</p>
          <p class="text-base font-mono">{{ objectId }}</p>
        </div>
        <div v-if="description">
          <p class="text-sm text-muted-foreground">Description</p>
          <p class="text-sm">{{ description }}</p>
        </div>
        <div class="flex flex-wrap gap-2 pt-1">
          <UiButton
            as="a"
            :href="qrDataUrl"
            :download="downloadName"
            variant="outline"
            icon="lucide:download"
            icon-placement="left"
          >
            Download QR code
          </UiButton>
          <UiButton
            as="button"
            variant="ghost"
            icon="lucide:copy"
            icon-placement="left"
            @click="copyId"
          >
            Copy object ID
          </UiButton>
          <span v-if="copied" class="text-xs text-muted-foreground">Copied</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    name: string;
    objectId: string;
    qrDataUrl: string;
    description?: string;
  }>();

  const copied = ref(false);

  const downloadName = computed(() => {
    const safeName = props.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const fallback = safeName ? `${safeName}-qr.png` : "object-qr.png";
    return fallback;
  });

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(props.objectId);
      copied.value = true;
      window.setTimeout(() => {
        copied.value = false;
      }, 1500);
    } catch {
      copied.value = false;
    }
  };
</script>
