<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton default-href="/" text="Zurück" />
                </IonButtons>
                <IonTitle>Item-Details</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent :fullscreen="true" class="ion-padding">
            <div v-if="!item" class="text-center text-muted-foreground py-8">
                Item nicht gefunden.
            </div>
            <div v-else class="flex flex-col gap-6">
                <div class="space-y-2">
                    <h2 class="text-xl font-semibold">{{ item.name }}</h2>
                    <p v-if="item.description" class="text-muted-foreground">
                        {{ item.description }}
                    </p>
                </div>

                <div class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4">
                    <IonText class="text-sm text-muted-foreground">QR-Code</IonText>
                    <img v-if="item.qrCodeDataUrl" :src="item.qrCodeDataUrl" :alt="`QR-Code fuer ${item.name}`"
                        class="w-48 h-48 object-contain rounded-md bg-white shadow-sm" />
                    <IonText v-else color="medium">QR-Code nicht verfügbar.</IonText>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
import { useItems } from "~/composables/useItems"

defineOptions({
    name: "ItemDetail",
})

useHead({
    title: "Item-Details",
})

const route = useRoute()
console.log("route.params.id:", route.params.id)
const { items } = useItems()

const item = computed(() => {
    const id = typeof route.params.id === "string" ? route.params.id : route.params.id?.[0]
    return items.value.find((entry) => entry.id === id) || null
})
</script>
