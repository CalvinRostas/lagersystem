<template>
  <IonModal
    :is-open="open"
    :breakpoints="[0, 0.5, 0.75]"
    :initial-breakpoint="0.5"
    handle
    @did-dismiss="close"
  >
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
      <div class="flex flex-col gap-4 mt-5">
        <IonItem lines="none" class="pl-0">
          <IonLabel position="stacked">{{ inputLabel }}</IonLabel>
          <IonInput
            v-model="searchQuery"
            type="text"
            :placeholder="inputPlaceholder"
            clear-input
            :aria-label="inputAriaLabel"
          />
        </IonItem>
        <IonButton
          expand="block"
          size="default"
          @click="onScanQrClick"
          class="px-4"
        >
          <IonIcon :icon="ioniconsQrCodeOutline" slot="start" class="mr-2" />
          {{ qrButtonLabel }}
        </IonButton>
        <IonText
          v-if="scanError"
          color="danger"
          class="text-sm block mt-1 px-4"
          >{{ scanError }}</IonText
        >
      </div>

      <div class="mt-6">
        <IonText class="text-sm text-muted-foreground px-4">
          {{ resultsLabel }}
        </IonText>
        <IonList
          v-if="filteredItems.length > 0"
          lines="full"
          class="ion-no-padding mt-2"
        >
          <IonItem
            v-for="item in filteredItems"
            :key="item.id"
            button
            @click="onSelect(item)"
          >
            <div slot="start" class="shrink-0">
              <div
                class="size-10 overflow-hidden bg-muted flex items-center justify-center rounded-full mx-3 my-2"
                aria-hidden
              >
                <img
                  v-if="item.imageUrl"
                  :src="item.imageUrl"
                  :alt="item.name"
                  class="size-full object-cover"
                  loading="lazy"
                />
                <IonIcon
                  v-else
                  :icon="resultLeadingIcon || ioniconsSearchOutline"
                  class="text-2xl text-muted-foreground"
                  aria-hidden
                />
              </div>
            </div>
            <IonLabel>
              <h2>{{ item.name }}</h2>
              <p v-if="item.description" class="ion-text-wrap">
                {{ item.description }}
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
        <div v-else class="mt-3 px-4">
          <IonText class="text-sm text-muted-foreground">
            <p class="mb-3">{{ emptyResultsLabel }}</p>
          </IonText>
          <IonButton
            v-if="showCreateButton"
            expand="block"
            fill="outline"
            @click="onCreateClick"
          >
            <IonIcon :icon="ioniconsAddOutline" slot="start" class="mr-2" />
            {{ createButtonLabel }}
          </IonButton>
        </div>
      </div>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

// Type definition for entities that can be searched and displayed in the drawer
type SearchEntity = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
};

// Set the component name for better debugging and devtools support
defineOptions({
  name: "SearchDrawer",
});

// Controls the open/close state of the modal
const open = defineModel<boolean>({ default: false });

// Props for customizing the search drawer's appearance and behavior
const props = defineProps({
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
  items: {
    type: Array as PropType<SearchEntity[]>,
    default: () => [],
  },
  resultsLabel: {
    type: String,
    default: "Results",
  },
  emptyResultsLabel: {
    type: String,
    default: "No matches found.",
  },
  resultLeadingIcon: {
    type: [String, Object] as PropType<string | object>,
    default: undefined,
  },
  showCreateButton: {
    type: Boolean,
    default: false,
  },
  createButtonLabel: {
    type: String,
    default: "Create new",
  },
});

// Emits events for parent component interaction
const emit = defineEmits<{
  (e: "select", item: SearchEntity): void;
  (e: "create"): void;
  (e: "scanResult", scannedCode: string): void;
}>();

// The current search input from the user
const searchQuery = ref("");

/**
 * Computed list of items filtered by the current search query.
 * Matches against name, description, or id (case-insensitive).
 * Used to display only relevant results in the drawer.
 */
const filteredItems = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (query.length === 0) {
    return [...props.items];
  }
  return props.items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(query);
    const descriptionMatch =
      item.description?.toLowerCase().includes(query) ?? false;
    const idMatch = item.id.toLowerCase().includes(query);
    return nameMatch || descriptionMatch || idMatch;
  });
});

/**
 * Emits the 'create' event and closes the drawer.
 * Used when the user wants to create a new entity.
 */
function onCreateClick() {
  emit("create");
  close();
}

/**
 * Closes the search drawer modal.
 */
function close() {
  open.value = false;
}

/**
 * Emits the 'select' event with the selected item and closes the drawer.
 * @param {SearchEntity} item - The selected entity
 */
function onSelect(item: SearchEntity) {
  emit("select", item);
  close();
}

// Holds any error message from the QR code scanner
const scanError = ref("");

/**
 * Initiates QR code scanning using the Capacitor Barcode Scanner plugin.
 * Emits the 'scanResult' event with the scanned code if successful.
 * Handles and displays errors if scanning fails.
 * @returns {Promise<void>}
 */
async function onScanQrClick() {
  scanError.value = "";
  try {
    const { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } =
      await import("@capacitor/barcode-scanner");
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
    });
    const code = result?.ScanResult?.trim();
    if (code) {
      close();
      emit("scanResult", code);
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Scan failed";
    scanError.value = message;
  }
}
</script>
