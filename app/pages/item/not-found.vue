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
                <IonTitle>Item not found</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent :fullscreen="true" class="ion-padding">
            <div class="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <IonIcon :icon="ioniconsAlertCircleOutline" class="text-6xl text-muted-foreground mb-4" />
                <h1 class="text-xl font-semibold mb-2">Item not found</h1>
                <p class="text-muted-foreground mb-6 max-w-sm">
                    The scanned QR code did not match any item in your list. The item may have been removed or the code may be invalid.
                </p>
                <IonButton expand="block" fill="solid" @click="() => navigateTo('/')">
                    Back to items
                </IonButton>
            </div>
        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
defineOptions({
    name: "ItemNotFound",
})

useHead({
    title: "Item not found",
})
</script>
