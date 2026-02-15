<template>
    <div class="rounded-lg border border-gray-200 p-4">
        <IonText v-if="label" class="text-sm font-medium text-muted-foreground">{{ label }}</IonText>
        <h2 :class="label ? 'text-lg font-semibold mt-2' : 'text-xl font-semibold'">{{ title }}</h2>
        <p v-if="description" class="text-sm text-muted-foreground mt-1">
            {{ description }}
        </p>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: "DetailInfoCard",
})

defineProps({
    label: {
        type: String,
        default: "",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
})
</script>
