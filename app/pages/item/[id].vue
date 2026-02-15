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
            </IonToolbar>
        </IonHeader>
        <IonContent :fullscreen="true" class="ion-padding">
            <div v-if="!item" class="text-center text-muted-foreground py-8">
                Item not found.
            </div>

            <div v-else class="flex flex-col gap-6">

                <DetailInfoCard :title="item.name" :description="item.description" />

                <QRCodeDisplay :qr-code-data-url="item.qrCodeDataUrl" :alt-text="`QR code for ${item.name}`" />

                <DetailInfoCard v-if="storageLocation" label="Storage Location" :title="storageLocation.name"
                    :description="storageLocation.description" />

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
console.log("route.params.id:", route.params.id)
const { items } = useItems()
const { getById } = useUseStorageLocation()

const item = computed(() => {
    const id = typeof route.params.id === "string" ? route.params.id : route.params.id?.[0]
    return items.value.find((entry) => entry.id === id) || null
})

const storageLocation = computed(() => {
    if (!item.value?.storageLocationId) return null
    return getById(item.value.storageLocationId)
})
</script>
