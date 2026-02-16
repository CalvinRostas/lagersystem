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
                <IonTitle>Storage location not found</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent :fullscreen="true" class="ion-padding">
            <div class="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <IonIcon :icon="ioniconsAlertCircleOutline" class="text-6xl text-muted-foreground mb-4" />
                <h1 class="text-xl font-semibold mb-2">Storage location not found</h1>
                <p class="text-muted-foreground mb-6 max-w-sm">
                    The scanned QR code did not match any storage location in your list. The item may
                    have been removed or the code may be invalid.
                </p>
                <IonButton class="mb-5" expand="block" fill="solid"
                    @click="() => navigateTo('/storage-location/create')">
                    Create storage location
                </IonButton>
                <IonButton expand="block" fill="solid" @click="() => navigateTo('/storage-location')">
                    Back to storage locations
                </IonButton>
            </div>
        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
// Set the component name for better debugging and devtools support
defineOptions({
    name: "StorageLocationNotFound",
});

// Set the page title in the browser/tab
useHead({
    title: "Storage location not found",
});
</script>
