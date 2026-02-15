<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle v-if="!showSegment" class="mx-3">{{ title }}</IonTitle>
      <IonSegment
        v-else
        :value="segmentValue"
        class="mx-3"
        @ionChange="onSegmentChange"
      >
        <IonSegmentButton
          v-for="option in segmentOptions"
          :key="option.value"
          :value="option.value"
        >
          <IonLabel>{{ option.label }}</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <IonButtons v-if="showAdd || showSearch" slot="end">
        <IonButton v-if="showAdd" id="add-trigger" :aria-label="addAriaLabel">
          <IonIcon :icon="addIcon || ioniconsAddOutline" />
        </IonButton>
        <IonButton
          v-if="showSearch"
          :aria-label="searchAriaLabel"
          @click="onSearch"
        >
          <IonIcon :icon="searchIcon || ioniconsSearchOutline" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>

  <IonPopover
    v-if="showAdd"
    trigger="add-trigger"
    trigger-action="click"
    :dismiss-on-select="true"
  >
    <IonContent class="ion-padding">
      <IonList>
        <IonItem button :detail="false" @click="onAddItem">
          <IonLabel>{{ addItemLabel }}</IonLabel>
        </IonItem>
        <IonItem button :detail="false" @click="onAddStorageLocation">
          <IonLabel>{{ addStorageLabel }}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPopover>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

// Set the component name for better debugging and devtools support
defineOptions({
  name: "PageHeaderActions",
});

// Props for customizing the header actions and segment control
defineProps({
  title: {
    type: String,
    required: true,
  },
  showSegment: {
    type: Boolean,
    default: false,
  },
  segmentValue: {
    type: String,
    default: "",
  },
  segmentOptions: {
    type: Array as PropType<Array<{ value: string; label: string }>>,
    default: () => [],
  },
  showAdd: {
    type: Boolean,
    default: true,
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
  addIcon: {
    type: [String, Object] as PropType<string | object>,
    default: undefined,
  },
  searchIcon: {
    type: [String, Object] as PropType<string | object>,
    default: undefined,
  },
  addAriaLabel: {
    type: String,
    default: "Create new item",
  },
  searchAriaLabel: {
    type: String,
    default: "Search by name or QR code",
  },
  addItemLabel: {
    type: String,
    default: "Item",
  },
  addStorageLabel: {
    type: String,
    default: "Storage location",
  },
});

// Emits events for parent component interaction
const emit = defineEmits<{
  (e: "add-item"): void;
  (e: "add-storage-location"): void;
  (e: "search"): void;
  (e: "segment-change", value: string): void;
}>();

// Emit when the user selects to add a new item
function onAddItem() {
  emit("add-item");
}

// Emit when the user selects to add a new storage location
function onAddStorageLocation() {
  emit("add-storage-location");
}

// Emit when the user clicks the search button
function onSearch() {
  emit("search");
}

// Emit when the segment control value changes
function onSegmentChange(event: CustomEvent) {
  const value = event.detail?.value;
  if (typeof value === "string" && value.length > 0) {
    emit("segment-change", value);
  }
}
</script>
