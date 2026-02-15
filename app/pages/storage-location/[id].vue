<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="() => navigateTo('/storage-location')">
            <IonIcon :icon="ioniconsArrowBackOutline" slot="start" />
            Back
          </IonButton>
        </IonButtons>
        <IonTitle>Storage Location Details</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" class="ion-padding">
      <div v-if="!location" class="text-center text-muted-foreground py-8">
        Storage location not found.
      </div>
      <div v-else class="flex flex-col gap-6">
        <DetailInfoCard
          :title="location.name"
          :description="location.description"
        />

        <QRCodeDisplay
          :qr-code-data-url="location.qrCodeDataUrl"
          :alt-text="`QR code for ${location.name}`"
        />

        <div>
          <h2 class="text-lg font-semibold mb-4 px-4">
            Items at this location
          </h2>
          <EntityList
            class="mt-4"
            :items="itemsAtLocation"
            empty-title="No items at this location"
            empty-description="Items assigned to this storage location will appear here."
            :empty-icon="ioniconsCubeOutline"
            :leading-icon="ioniconsImageOutline"
            :show-actions="true"
            variant="card"
            @view="onViewItem"
          />
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
import { useUseStorageLocation } from "~/composables/useStorageLocation";
import { useItems } from "~/composables/useItems";
import type { Item } from "~/composables/useItems";

// Set the component name for better debugging and devtools support
defineOptions({
  name: "StorageLocationDetail",
});

// Set the page title in the browser/tab
useHead({
  title: "Storage Location Details",
});

// Get route and router for navigation
const route = useRoute();
const router = useIonRouter();
// All available storage locations
const { storageLocations } = useUseStorageLocation();
// Function to get items by storage location
const { getByStorageLocation } = useItems();

// Computed property for the current storage location based on route param
const location = computed(() => {
  const id =
    typeof route.params.id === "string"
      ? route.params.id
      : route.params.id?.[0];
  return storageLocations.value.find((entry) => entry.id === id) || null;
});

// Computed property for all items assigned to this storage location
const itemsAtLocation = computed(() => {
  if (!location.value) return [];
  return getByStorageLocation(location.value.id);
});

// Navigate to the item detail page when an item is selected
function onViewItem(item: Item) {
  router.push(`/item/${item.id}`);
}
</script>
