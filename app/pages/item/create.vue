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
      <EntityForm
        name-label="Name"
        name-placeholder="Enter name"
        name-error-message="Name is required."
        description-label="Description"
        description-placeholder="Enter description"
        submit-label="Save"
        :disabled="!selectedStorageLocation"
        @submit="onSubmit"
      >
        <div class="mt-4 mx-4">
          <IonText class="text-sm text-muted-foreground block mb-2"
            >Item photo</IonText
          >
          <div class="w-full flex flex-col items-center justify-center">
            <div
              class="w-28 h-28 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center"
            >
              <img
                v-if="itemPhotoDataUrl"
                :src="itemPhotoDataUrl"
                :alt="'Item photo'"
                class="w-full h-full object-cover"
              />
              <IonIcon
                v-else
                :icon="ioniconsImageOutline"
                class="text-4xl text-muted-foreground"
              />
            </div>
            <div class="flex gap-2 mt-2">
              <IonButton
                size="small"
                fill="outline"
                :disabled="cameraLoading"
                @click="takePhoto"
              >
                <IonIcon :icon="ioniconsCameraOutline" slot="start" />
                {{ itemPhotoDataUrl ? "Retake" : "Take photo" }}
              </IonButton>
              <IonButton
                v-if="itemPhotoDataUrl"
                size="small"
                fill="clear"
                color="medium"
                @click="itemPhotoDataUrl = ''"
              >
                Remove
              </IonButton>
            </div>
          </div>
          <IonText
            v-if="cameraError"
            color="danger"
            class="text-sm block mt-1"
            >{{ cameraError }}</IonText
          >
        </div>

        <IonButton
          expand="block"
          class="mt-2 px-4"
          @click="searchDrawerOpen = true"
        >
          Select storage location
        </IonButton>
        <IonText class="text-sm text-muted-foreground">
          <p class="mt-2 mb-0">
            <span v-if="selectedStorageLocation">
              Selected: {{ selectedStorageLocation.name }}
              <span v-if="selectedStorageLocation.description">
                - {{ selectedStorageLocation.description }}</span
              >
            </span>
            <span v-else class="px-4"> No storage location selected. </span>
          </p>
        </IonText>
      </EntityForm>
    </IonContent>

    <SearchDrawer
      v-model="searchDrawerOpen"
      title="Search storage locations"
      input-label="Search storage locations"
      input-placeholder="Enter storage location..."
      input-aria-label="Search storage locations"
      qr-button-label="Scan storage QR code"
      :items="storageLocations"
      :result-leading-icon="ioniconsLocationOutline"
      :show-create-button="true"
      create-button-label="Create storage location"
      @select="onSelectStorageLocation"
      @create="onCreateStorageLocation"
    />
  </IonPage>
</template>

<script lang="ts" setup>
import { Camera, CameraResultType } from "@capacitor/camera";
import { useItems } from "~/composables/useItems";
import type { StorageLocation } from "~/composables/useStorageLocation";

// Set the component name for better debugging and devtools support
defineOptions({
  name: "CreateItem",
});

// Set the page title in the browser/tab
useHead({
  title: "Create Item",
});

// All available storage locations for selection
const { storageLocations } = useUseStorageLocation();
// Controls the open/close state of the storage location search drawer
const searchDrawerOpen = ref(false);
// The currently selected storage location
const selectedStorageLocation = ref<StorageLocation | null>(null);
// Holds the data URL of the item photo (if taken)
const itemPhotoDataUrl = ref("");
// Loading and error state for camera/photo
const cameraLoading = ref(false);
const cameraError = ref("");

// Create function for new items
const { create } = useItems();

// Router for navigation
const router = useIonRouter();

// Take a photo using the device camera and store as data URL
async function takePhoto() {
  cameraError.value = "";
  cameraLoading.value = true;
  try {
    const photo = await Camera.getPhoto({
      quality: 85,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });
    if (photo.dataUrl) {
      itemPhotoDataUrl.value = photo.dataUrl;
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not take photo";
    cameraError.value = message;
  } finally {
    cameraLoading.value = false;
  }
}

// Handle form submission, create the item, and navigate to its detail page
async function onSubmit(data: { name: string; description: string }) {
  const created = await create({
    ...data,
    imageUrl: itemPhotoDataUrl.value || undefined,
    storageLocationId: selectedStorageLocation.value?.id,
  });
  itemPhotoDataUrl.value = "";
  router.push(`/item/${created.id}`);
}

// Set the selected storage location from the search drawer
function onSelectStorageLocation(location: StorageLocation) {
  selectedStorageLocation.value = location;
}

// Navigate to the create storage location page
function onCreateStorageLocation() {
  router.push("/storage-location/create");
}
</script>
