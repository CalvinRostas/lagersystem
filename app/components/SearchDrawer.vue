<template>
  <IonModal :is-open="open" :breakpoints="[0, 0.5, 0.75]" :initial-breakpoint="0.5" handle @did-dismiss="close">
    <IonHeader>
      <IonToolbar>
        <IonTitle class="mx-3">{{ title }}</IonTitle>
        <IonButtons slot="end">
          <IonButton aria-label="Close" @click="close">
            <IonIcon :icon="ioniconsCloseOutline" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <div class="flex flex-col gap-4">
        <IonItem lines="none" class="pl-0">
          <IonLabel position="stacked">{{ inputLabel }}</IonLabel>
          <IonInput v-model="searchQuery" type="text" :placeholder="inputPlaceholder" clear-input
            :aria-label="inputAriaLabel" />
        </IonItem>
        <IonButton expand="block" size="default" @click="onScanQrClick">
          <IonIcon :icon="ioniconsQrCodeOutline" slot="start" />
          {{ qrButtonLabel }}
        </IonButton>
      </div>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
defineOptions({
  name: "SearchDrawer",
})

const open = defineModel<boolean>({ default: false })

defineProps({
  title: {
    type: String,
    default: "Search",
  },
  inputLabel: {
    type: String,
    default: "Search by name",
  },
  inputPlaceholder: {
    type: String,
    default: "Enter item...",
  },
  inputAriaLabel: {
    type: String,
    default: "Search by name",
  },
  qrButtonLabel: {
    type: String,
    default: "Scan QR code",
  },
})

const searchQuery = ref("")

function close() {
  open.value = false
}

/** QR scan – placeholder for future implementation. */
function onScanQrClick() {
  // TODO: Open QR scanner (e.g. Capacitor plugin)
}
</script>
