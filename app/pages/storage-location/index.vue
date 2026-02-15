<template>
  <IonPage>
    <PageHeaderActions title="Storage Locations" :show-segment="true" segment-value="storage"
      :segment-options="segmentOptions" @segment-change="onSegmentChange" :show-add="true" :show-search="true"
      @add-item="onAddItem" @add-storage-location="onAddStorageLocation" @search="onSearchClick" />

    <IonContent :fullscreen="true">
      <EntityList :items="storageLocations" empty-title="No storage locations found"
        empty-description="Create storage locations to see them here." :empty-icon="ioniconsLocationOutline"
        :leading-icon="ioniconsLocationOutline" :show-actions="true" @view="onViewStorageLocation" />
    </IonContent>

    <SearchDrawer v-model="searchDrawerOpen" title="Search storage locations" input-label="Search storage locations"
      input-placeholder="Enter storage location..." input-aria-label="Search storage locations"
      qr-button-label="Scan storage QR code" :items="storageLocations" :result-leading-icon="ioniconsLocationOutline"
      :show-create-button="true" create-button-label="Create storage location" @select="onSelectStorageLocation"
      @create="onAddStorageLocation" />
  </IonPage>
</template>

<script lang="ts" setup>
import { useUseStorageLocation } from "~/composables/useStorageLocation"
import type { StorageLocation } from "~/composables/useStorageLocation"

defineOptions({
  name: "Storage Locations",
})

useHead({
  title: "Storage Locations",
})

const { storageLocations } = useUseStorageLocation()
const searchDrawerOpen = ref(false)

const router = useIonRouter()

const segmentOptions = [
  { value: "items", label: "Items" },
  { value: "storage", label: "Storage" },
]

function onSearchClick() {
  searchDrawerOpen.value = true
}

function onSegmentChange(value: string) {
  if (value === "items") {
    navigateTo("/")
  }
}

/** Navigate to create item page */
function onAddItem() {
  navigateTo("/item/create")
}

/** Navigate to create storage location page */
function onAddStorageLocation() {
  navigateTo("/storage-location/create")
}

/** View storage location */
function onViewStorageLocation(location: StorageLocation) {
  router.push(`/storage-location/${location.id}`)
}

function onSelectStorageLocation(location: StorageLocation) {
  router.push(`/storage-location/${location.id}`)
}
</script>