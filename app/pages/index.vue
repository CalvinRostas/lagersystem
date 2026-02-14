<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle class="mx-3">Meine Gegenstände</IonTitle>
                <IonButtons slot="end">
                    <IonButton id="add-trigger" aria-label="Neues Element anlegen">
                        <IonIcon :icon="ioniconsAddOutline" />
                    </IonButton>
                    <IonButton id="search-trigger" aria-label="Suche bei Namen oder mit QR-Code" @click="onSearchClick">
                        <IonIcon :icon="ioniconsSearchOutline" />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent :fullscreen="true">
            <div v-if="items.length === 0"
                class="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <IonIcon :icon="ioniconsCubeOutline" class="text-[80px] text-muted-foreground mb-4" />
                <h2 class="text-xl font-semibold mb-2 text-black">
                    Keine Gegenstände gefunden
                </h2>
                <p class="text-[0.9375rem] text-muted-foreground max-w-70 leading-snug m-0">
                    Fügen Sie Gegenstände hinzu, um sie angezeigt zu bekommen. Verwenden Sie die Suche oben, um
                    Gegenstände nach Name oder QR-Code zu finden.
                </p>
            </div>
            <IonList v-else lines="full" class="ion-no-padding">
                <IonItem v-for="item in items" :key="item.id" class="[--padding-end:0]">
                    <div slot="start" class="shrink-0">
                        <div class="size-10 overflow-hidden bg-muted flex items-center justify-center rounded-full mx-3 my-2"
                            aria-hidden>
                            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name"
                                class="size-full object-cover" loading="lazy" />
                            <IonIcon v-else :icon="ioniconsImageOutline" class="text-2xl text-muted-foreground"
                                aria-hidden />
                        </div>
                    </div>
                    <IonLabel>
                        <h2>{{ item.name }}</h2>
                        <p v-if="item.description" class="ion-text-wrap">
                            {{ item.description }}
                        </p>
                    </IonLabel>
                    <div slot="end"
                        class="flex items-center [&_ion-button]:[--padding-start:8px] [&_ion-button]:[--padding-end:8px] [&_ion-button]:m-0">
                        <IonButton fill="clear" size="small" aria-label="View item" @click="onViewItem(item)">
                            <IonIcon :icon="ioniconsEyeOutline" slot="icon-only" />
                        </IonButton>
                        <IonButton fill="clear" size="small" aria-label="Edit item" @click="onEditItem(item)">
                            <IonIcon :icon="ioniconsCreateOutline" slot="icon-only" />
                        </IonButton>
                    </div>
                </IonItem>
            </IonList>
        </IonContent>
        <IonPopover trigger="add-trigger" trigger-action="click" :dismiss-on-select="true">
            <IonContent class="ion-padding">
                <IonList>
                    <IonItem button :detail="false" @click="onAddItem">
                        <IonLabel>Item</IonLabel>
                    </IonItem>
                    <IonItem button :detail="false" @click="onAddStorageLocation">
                        <IonLabel>Storage location</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPopover>
        <SearchDrawer v-model="searchDrawerOpen" />
    </IonPage>
</template>

<script setup lang="ts">
import type { Item } from "~/types/item"
import { useItems } from "~/composables/useItems"

defineOptions({
    name: "Gegenstände",
})

useHead({
    title: "Meine Gegenstände",
})

const { items } = useItems()
const searchDrawerOpen = ref(false)

function onSearchClick() {
    searchDrawerOpen.value = true
    console.log("searchDrawerOpen", searchDrawerOpen.value)
}

/** Navigate to create item page */
function onAddItem() {
    navigateTo("/item/create")
}

/** Navigate to create storage location page */
function onAddStorageLocation() {
    // navigateTo("/storage-location/create-")
}

/** View item – placeholder for future implementation. */
function onViewItem(_item: Item) {
    // TODO: Navigate to view item
}

/** Edit item – placeholder for future implementation. */
function onEditItem(_item: Item) {
    // TODO: Navigate to edit item
}
</script>
