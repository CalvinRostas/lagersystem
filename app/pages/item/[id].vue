<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="() => navigateTo('/')">
                        <IonIcon :icon="ioniconsArrowBackOutline" slot="start" />
                        Back
                    </IonButton>
                </IonButtons>
                <IonTitle>Item Details</IonTitle>
                <IonButtons v-if="item" slot="end">
                    <IonButton color="danger" @click="confirmDelete" aria-label="Delete item">
                        <IonIcon :icon="ioniconsTrashOutline" slot="icon-only" />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent :fullscreen="true" class="ion-padding">
            <div v-if="!item" class="text-center text-muted-foreground py-8">
                Item not found.
            </div>
            <div v-else class="flex flex-col gap-6">
                <div class="flex flex-col items-center gap-2">
                    <div
                        class="w-40 h-40 my-5 rounded-xl border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name"
                            class="w-full h-full object-cover" />
                        <IonIcon v-else :icon="ioniconsImageOutline" class="text-6xl text-muted-foreground" />
                    </div>
                    <IonText class="text-sm text-muted-foreground">Item photo</IonText>
                </div>
                <DetailInfoCard :title="item.name" :description="item.description" />
                <DetailInfoCard v-if="storageLocation" label="Storage Location" :title="storageLocation.name"
                    :description="storageLocation.description" />
                <QRCodeDisplay :qr-code-data-url="item.qrCodeDataUrl" :alt-text="`QR code for ${item.name}`" />
            </div>
        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
import { useItems } from "~/composables/useItems"
import { useUseStorageLocation } from "~/composables/useStorageLocation"

defineOptions({
    name: "ItemDetail",
})

useHead({
    title: "Item Details",
})

const route = useRoute()
const router = useIonRouter()
const { items, remove } = useItems()
const { getById } = useUseStorageLocation()

const item = computed(() => {
    const id = typeof route.params.id === "string" ? route.params.id : route.params.id?.[0]
    return items.value.find((entry) => entry.id === id) || null
})

const storageLocation = computed(() => {
    if (!item.value?.storageLocationId) return null
    return getById(item.value.storageLocationId)
})

function confirmDelete() {
    if (!item.value) return
    if (!window.confirm(`Delete "${item.value.name}"? This cannot be undone.`)) return
    remove(item.value.id)
    router.push("/")
}
</script>
