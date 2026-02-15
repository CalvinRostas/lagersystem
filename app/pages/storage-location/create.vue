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
      <EntityForm name-label="Name" name-placeholder="Enter name" name-error-message="Name is required."
        description-label="Description" description-placeholder="Enter description" submit-label="Save"
        @submit="onSubmit" />
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
import { useUseStorageLocation } from "~/composables/useStorageLocation"

defineOptions({
  name: "CreateStorageLocation",
})

useHead({
  title: "Create Storage Location",
})

const { create } = useUseStorageLocation()

const router = useIonRouter()

async function onSubmit(data: { name: string; description: string }) {
  const created = await create(data)
  router.push(`/storage-location/${created.id}`)
}
</script>