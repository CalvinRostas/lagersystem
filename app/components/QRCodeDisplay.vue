<template>
  <div
    class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4"
  >
    <IonText class="text-sm text-muted-foreground">{{ label }}</IonText>
    <img
      v-if="qrCodeDataUrl"
      ref="qrImageRef"
      :src="qrCodeDataUrl"
      :alt="altText"
      class="w-48 h-48 object-contain rounded-md bg-white shadow-sm"
    />
    <IonText v-else color="medium">{{ emptyMessage }}</IonText>

    <div v-if="qrCodeDataUrl" class="flex gap-2 mt-2">
      <IonButton
        size="small"
        fill="outline"
        :disabled="!!actionLoading"
        @click="downloadQRCode"
      >
        <IonIcon :icon="ioniconsDownloadOutline" slot="start" />
        {{ actionLoading === "download" ? "Saving…" : "Download" }}
      </IonButton>
      <IonButton
        size="small"
        fill="outline"
        :disabled="!!actionLoading"
        @click="printQRCode"
      >
        <IonIcon :icon="ioniconsPrintOutline" slot="start" />
        {{ actionLoading === "print" ? "Opening…" : "Print" }}
      </IonButton>
    </div>
    <IonText v-if="actionError" color="danger" class="text-sm mt-1">{{
      actionError
    }}</IonText>
  </div>

  <!-- Hidden print area -->
  <div v-if="qrCodeDataUrl" class="print-only">
    <div class="print-container">
      <h2 class="print-title">{{ altText }}</h2>
      <img :src="qrCodeDataUrl" :alt="altText" class="print-qr-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Capacitor plugins for platform detection, file handling, sharing, and printing
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { Printer } from "@capgo/capacitor-printer";

// Set the component name for better debugging and devtools support
defineOptions({
  name: "QRCodeDisplay",
});

// Props for customizing the QR code display and messages
const props = defineProps({
  qrCodeDataUrl: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "QR Code",
  },
  altText: {
    type: String,
    default: "QR code",
  },
  emptyMessage: {
    type: String,
    default: "QR code not available.",
  },
});

// Reference to the QR image element (for future use, e.g., copying)
const qrImageRef = ref<HTMLImageElement | null>(null);
// Tracks which action is currently loading (download/print/none)
const actionLoading = ref<"download" | "print" | "">("");
// Holds any error message from download/print actions
const actionError = ref("");

/**
 * Extract raw base64 string from a data URL (e.g. data:image/png;base64,...).
 * @param {string} dataUrl - The data URL to extract from
 * @returns {string | null} The base64 string or null if invalid
 */
function getBase64FromDataUrl(dataUrl: string): string | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  return match ? (match[2] ?? null) : null;
}

/**
 * Download the QR code image to the device or share it (native or web).
 * Handles both native (Capacitor) and web platforms.
 */
async function downloadQRCode() {
  if (!props.qrCodeDataUrl) return;
  actionError.value = "";
  actionLoading.value = "download";
  try {
    if (Capacitor.isNativePlatform()) {
      // Native: save to cache and open share dialog
      const base64 = getBase64FromDataUrl(props.qrCodeDataUrl);
      if (!base64) throw new Error("Invalid QR code image");
      const filename = `qr-code-${Date.now()}.png`;
      const result = await Filesystem.writeFile({
        path: filename,
        data: base64,
        directory: Directory.Cache,
        recursive: true,
      });
      await Share.share({
        title: props.altText,
        url: result.uri,
        dialogTitle: "Save or share QR code",
      });
    } else {
      // Web: trigger a download using a temporary link
      const link = document.createElement("a");
      const blob = dataUrlToBlob(props.qrCodeDataUrl);
      if (!blob) throw new Error("Invalid QR code image");
      link.href = URL.createObjectURL(blob);
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Download failed";
    actionError.value = message;
  } finally {
    actionLoading.value = "";
  }
}

/**
 * Convert a data URL to a Blob object for web downloads.
 * @param {string} dataUrl - The data URL to convert
 * @returns {Blob | null} The resulting Blob or null if invalid
 */
function dataUrlToBlob(dataUrl: string): Blob | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match || !match[1] || !match[2]) return null;
  const mime = match[1];
  const bin = atob(match[2]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

/**
 * Print the QR code image using native or web print dialogs.
 * Handles both native (Capacitor) and web platforms.
 */
async function printQRCode() {
  if (!props.qrCodeDataUrl) return;
  actionError.value = "";
  actionLoading.value = "print";
  try {
    if (Capacitor.isNativePlatform()) {
      // Native: print using the printer plugin
      const base64 = getBase64FromDataUrl(props.qrCodeDataUrl);
      if (!base64) throw new Error("Invalid QR code image");
      await Printer.printBase64({
        name: props.altText || "QR Code",
        data: base64,
        mimeType: "image/png",
      });
    } else {
      // Web: open the browser print dialog
      window.print();
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Print failed";
    actionError.value = message;
  } finally {
    actionLoading.value = "";
  }
}
</script>

<style scoped>
/* Hide print area by default */
.print-only {
  display: none;
}

/* Show only print content when printing */
@media print {
  /* Hide everything except print content/*  */
  body * {
    visibility: hidden;
  }

  * .print-only,
  .print-only * {
    visibility: visible;
  }

  .print-only {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;
  }

  .print-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
  }

  .print-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: black;
  }

  .print-qr-image {
    width: 400px;
    height: 400px;
    object-fit: contain;
  }
}
</style>

<style>
/* Global print style to hide Ionic header */
@media print {
  ion-header {
    display: none !important;
  }
}
</style>
