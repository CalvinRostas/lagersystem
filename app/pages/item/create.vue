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
                <IonTitle>Create Item</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent :fullscreen="true" class="ion-padding">
            <EntityForm name-label="Name" name-placeholder="Enter name" name-error-message="Name is required."
                description-label="Description" description-placeholder="Enter description" submit-label="Save"
                :disabled="!selectedStorageLocation" @submit="onSubmit">

                <IonButton expand="block" class="mt-2 px-4" @click="searchDrawerOpen = true">
                    Select storage location
                </IonButton>
                <IonText class="text-sm text-muted-foreground">
                    <p class="mt-2 mb-0">
                        <span v-if="selectedStorageLocation">
                            Selected: {{ selectedStorageLocation.name }}
                            <span v-if="selectedStorageLocation.description"> - {{ selectedStorageLocation.description
                                }}</span>
                        </span>
                        <span v-else class="px-4">
                            No storage location selected.
                        </span>
                    </p>
                </IonText>

            </EntityForm>
        </IonContent>

        <SearchDrawer v-model="searchDrawerOpen" title="Search storage locations" input-label="Search storage locations"
            input-placeholder="Enter storage location..." input-aria-label="Search storage locations"
            qr-button-label="Scan storage QR code" :items="storageLocations"
            :result-leading-icon="ioniconsLocationOutline" :show-create-button="true"
            create-button-label="Create storage location" @select="onSelectStorageLocation"
            @create="onCreateStorageLocation" />

    </IonPage>
</template>

<script lang="ts" setup>
import { useItems } from "~/composables/useItems"
import type { StorageLocation } from "~/composables/useStorageLocation"

defineOptions({
    name: "CreateItem",
})

useHead({
    title: "Create Item",
})

const { storageLocations } = useUseStorageLocation()
const searchDrawerOpen = ref(false)
const selectedStorageLocation = ref<StorageLocation | null>(null)

const { create } = useItems()

const router = useIonRouter()

async function onSubmit(data: { name: string; description: string }) {
    const created = await create({
        ...data,
        storageLocationId: selectedStorageLocation.value?.id,
    })
    router.push(`/item/${created.id}`)
}

function onSelectStorageLocation(location: StorageLocation) {
    selectedStorageLocation.value = location
}

function onCreateStorageLocation() {
    router.push("/storage-location/create")
}
</script>
