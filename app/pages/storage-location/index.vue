<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle class="mx-3">Storage Locations</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <div v-if="storageLocations.length === 0"
        class="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <IonIcon :icon="ioniconsLocationOutline" class="text-[80px] text-muted-foreground mb-4" />
        <h2 class="text-xl font-semibold mb-2 text-black">
          Keine Storage Locations gefunden
        </h2>
        <p class="text-[0.9375rem] text-muted-foreground max-w-70 leading-snug m-0">
          Erstellen Sie Storage Locations, um sie hier anzuzeigen.
        </p>
      </div>
      <IonList v-else lines="full" class="ion-no-padding">
        <IonItem v-for="location in storageLocations" :key="location.id" class="[--padding-end:0]">
          <div slot="start" class="shrink-0">
            <div class="size-10 overflow-hidden bg-muted flex items-center justify-center rounded-full mx-3 my-2"
              aria-hidden>
              <IonIcon :icon="ioniconsLocationOutline" class="text-2xl text-muted-foreground" aria-hidden />
            </div>
          </div>
          <IonLabel>
            <h2>{{ location.name }}</h2>
            <p v-if="location.description" class="ion-text-wrap">
              {{ location.description }}
            </p>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
import { useUseStorageLocation } from "~/composables/useStorageLocation"

defineOptions({
  name: "Storage Locations",
})

useHead({
  title: "Storage Locations",
})

const { storageLocations } = useUseStorageLocation()
</script>