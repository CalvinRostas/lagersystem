<template>
    <div v-if="items.length === 0" class="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <IonIcon :icon="emptyIcon" class="text-[80px] text-muted-foreground mb-4" />
        <h2 class="text-xl font-semibold mb-2 text-black">
            {{ emptyTitle }}
        </h2>
        <p class="text-[0.9375rem] text-muted-foreground max-w-70 leading-snug m-0">
            {{ emptyDescription }}
        </p>
    </div>
    <IonList v-else lines="full" class="ion-no-padding">
        <IonItem v-for="item in items" :key="item.id" class="[--padding-end:0]">
            <div slot="start" class="shrink-0">
                <div class="size-10 overflow-hidden bg-muted flex items-center justify-center rounded-full mx-3 my-2"
                    aria-hidden>
                    <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="size-full object-cover"
                        loading="lazy" />
                    <IonIcon v-else :icon="leadingIcon" class="text-2xl text-muted-foreground" aria-hidden />
                </div>
            </div>
            <IonLabel>
                <h2>{{ item.name }}</h2>
                <p v-if="item.description" class="ion-text-wrap">
                    {{ item.description }}
                </p>
            </IonLabel>
            <div v-if="showActions" slot="end"
                class="flex items-center [&_ion-button]:[--padding-start:8px] [&_ion-button]:[--padding-end:8px] [&_ion-button]:m-0">
                <IonButton fill="clear" size="small" :aria-label="viewAriaLabel" @click="onView(item)">
                    <IonIcon :icon="viewIcon || ioniconsEyeOutline" slot="icon-only" />
                </IonButton>
                <IonButton fill="clear" size="small" :aria-label="editAriaLabel" @click="onEdit(item)">
                    <IonIcon :icon="editIcon || ioniconsCreateOutline" slot="icon-only" />
                </IonButton>
            </div>
        </IonItem>
    </IonList>
</template>

<script setup lang="ts">
import type { PropType } from "vue"

type EntityListItem = {
    id: string
    name: string
    description?: string
    imageUrl?: string
}

defineOptions({
    name: "EntityList",
})

defineProps({
    items: {
        type: Array as PropType<EntityListItem[]>,
        required: true,
    },
    emptyTitle: {
        type: String,
        required: true,
    },
    emptyDescription: {
        type: String,
        required: true,
    },
    emptyIcon: {
        type: [String, Object] as PropType<string | object>,
        required: true,
    },
    leadingIcon: {
        type: [String, Object] as PropType<string | object>,
        required: true,
    },
    showActions: {
        type: Boolean,
        default: false,
    },
    viewIcon: {
        type: [String, Object] as PropType<string | object>,
        default: undefined,
    },
    editIcon: {
        type: [String, Object] as PropType<string | object>,
        default: undefined,
    },
    viewAriaLabel: {
        type: String,
        default: "View item",
    },
    editAriaLabel: {
        type: String,
        default: "Edit item",
    },
})

const emit = defineEmits<{
    (e: "view", item: EntityListItem): void
    (e: "edit", item: EntityListItem): void
}>()

function onView(item: EntityListItem) {
    emit("view", item)
}

function onEdit(item: EntityListItem) {
    emit("edit", item)
}
</script>
