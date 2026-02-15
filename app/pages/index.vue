<template>
    <IonPage>
        <PageHeaderActions title="My Items" :add-icon="ioniconsAddOutline" :search-icon="ioniconsSearchOutline"
            :show-segment="true" segment-value="items" :segment-options="segmentOptions"
            @segment-change="onSegmentChange" @add-item="onAddItem" @add-storage-location="onAddStorageLocation"
            @search="onSearchClick" />

        <IonContent :fullscreen="true">
            <EntityList :items="items" empty-title="No items found"
                empty-description="Add items to see them here. Use the search above to find items by name or QR code."
                :empty-icon="ioniconsCubeOutline" :leading-icon="ioniconsImageOutline" :show-actions="true"
                @view="onViewItem" @edit="onEditItem" />
        </IonContent>

        <SearchDrawer v-model="searchDrawerOpen" title="Search items" input-label="Search items"
            input-placeholder="Enter item..." input-aria-label="Search items" qr-button-label="Scan item QR code"
            :items="items" :result-leading-icon="ioniconsCubeOutline" :show-create-button="true"
            create-button-label="Create item" @select="onSelectItem" @create="onAddItem" />
    </IonPage>
</template>

<script setup lang="ts">
import type { Item } from "~/types/item"
import { useItems } from "~/composables/useItems"

defineOptions({
    name: "Items",
})

useHead({
    title: "My Items",
})

const { items } = useItems()
const searchDrawerOpen = ref(false)

const router = useIonRouter()

const segmentOptions = [
    { value: "items", label: "Items" },
    { value: "storage", label: "Storage" },
]

function onSearchClick() {
    searchDrawerOpen.value = true
    console.log("searchDrawerOpen", searchDrawerOpen.value)
}

function onSegmentChange(value: string) {
    if (value === "storage") {
        navigateTo("/storage-location")
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

/** View item – placeholder for future implementation. */
function onViewItem(item: Item) {
    router.push(`/item/${item.id}`)
}


/** Edit item – placeholder for future implementation. */
function onEditItem(_item: Item) {
    // TODO: Navigate to edit item
}

function onSelectItem(item: Item) {
    router.push(`/item/${item.id}`)
}
</script>