<template>
  <IonPage>
    <PageHeaderActions title="Storage Locations" :show-segment="true" segment-value="storage"
      :segment-options="segmentOptions" @segment-change="onSegmentChange" :show-add="true" :show-search="true"
      @search="onSearchClick" />

    <IonContent :fullscreen="true">
      <EntityList :items="storageLocations" empty-title="No storage locations found"
        empty-description="Create storage locations to see them here." :empty-icon="ioniconsLocationOutline"
        :leading-icon="ioniconsLocationOutline" />
    </IonContent>

    <SearchDrawer v-model="searchDrawerOpen" title="Search storage locations" input-label="Search storage locations"
      input-placeholder="Enter storage location..." input-aria-label="Search storage locations"
      qr-button-label="Scan storage QR code" />
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
const searchDrawerOpen = ref(false)
const segmentOptions = [
  { value: "items", label: "Items" },
  { value: "storage", label: "Storage" },
]

function onSegmentChange(value: string) {
  if (value === "items") {
    navigateTo("/")
  }
}

function onSearchClick() {
  searchDrawerOpen.value = true
}
</script>