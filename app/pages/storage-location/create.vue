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
        <IonTitle>Create Storage Location</IonTitle>
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
        @submit="onSubmit"
      />
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
import { useUseStorageLocation } from "~/composables/useStorageLocation";

// Set the component name for better debugging and devtools support
defineOptions({
  name: "CreateStorageLocation",
});

// Set the page title in the browser/tab
useHead({
  title: "Create Storage Location",
});

// Create function for new storage locations
const { create } = useUseStorageLocation();

// Router for navigation
const router = useIonRouter();

// Handle form submission, create the storage location, and navigate to its detail page
async function onSubmit(data: { name: string; description: string }) {
  const created = await create(data);
  router.push(`/storage-location/${created.id}`);
}
</script>
