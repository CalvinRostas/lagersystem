<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
        <IonList class="ion-no-padding">
            <IonItem lines="full" class="mt-4">
                <IonLabel position="stacked">{{ nameLabel }} *</IonLabel>
                <IonInput v-model="localName" type="text" :placeholder="namePlaceholder"
                    :aria-invalid="nameTouched && localName.trim().length === 0" :aria-describedby="nameErrorId"
                    @ionBlur="nameTouched = true" />
            </IonItem>
            <IonText v-if="nameTouched && localName.trim().length === 0" color="danger" :id="nameErrorId">
                <p class="mt-2">{{ nameErrorMessage }}</p>
            </IonText>

            <IonItem lines="full" class="mt-4">
                <IonLabel position="stacked">{{ descriptionLabel }}</IonLabel>
                <IonTextarea v-model="localDescription" :placeholder="descriptionPlaceholder" :auto-grow="true" />
            </IonItem>
        </IonList>

        <slot></slot>

        <IonButton type="submit" expand="block" class="mt-4 px-4" :disabled="localName.trim().length === 0 || disabled">
            {{ submitLabel }}
        </IonButton>
    </form>
</template>

<script setup lang="ts">
defineOptions({
    name: "EntityForm",
})

const props = defineProps({
    nameLabel: {
        type: String,
        default: "Name",
    },
    namePlaceholder: {
        type: String,
        default: "Enter name",
    },
    nameErrorMessage: {
        type: String,
        default: "Name is required.",
    },
    descriptionLabel: {
        type: String,
        default: "Description",
    },
    descriptionPlaceholder: {
        type: String,
        default: "Enter description",
    },
    submitLabel: {
        type: String,
        default: "Save",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits<{
    (e: "submit", data: { name: string; description: string }): void
}>()

const localName = ref("")
const localDescription = ref("")
const nameTouched = ref(false)
const nameErrorId = "entity-name-error"

function handleSubmit() {
    nameTouched.value = true
    if (localName.value.trim().length === 0) {
        return
    }

    emit("submit", {
        name: localName.value.trim(),
        description: localDescription.value.trim(),
    })

    localName.value = ""
    localDescription.value = ""
    nameTouched.value = false
}
</script>
