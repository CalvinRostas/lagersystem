<template>
    <div class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4">
        <IonText class="text-sm text-muted-foreground">{{ label }}</IonText>
        <img v-if="qrCodeDataUrl" ref="qrImageRef" :src="qrCodeDataUrl" :alt="altText"
            class="w-48 h-48 object-contain rounded-md bg-white shadow-sm" />
        <IonText v-else color="medium">{{ emptyMessage }}</IonText>

        <div v-if="qrCodeDataUrl" class="flex gap-2 mt-2">
            <IonButton size="small" fill="outline" @click="downloadQRCode">
                <IonIcon :icon="ioniconsDownloadOutline" slot="start" />
                Download
            </IonButton>
            <IonButton size="small" fill="outline" @click="printQRCode">
                <IonIcon :icon="ioniconsPrintOutline" slot="start" />
                Print
            </IonButton>
        </div>
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
import { Capacitor } from "@capacitor/core"

defineOptions({
    name: "QRCodeDisplay",
})

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
})

const qrImageRef = ref<HTMLImageElement | null>(null)

function downloadQRCode() {
    if (!props.qrCodeDataUrl) return

    const link = document.createElement("a")
    link.href = props.qrCodeDataUrl
    link.download = `qr-code-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function printQRCode() {
    if (!props.qrCodeDataUrl) return

    // Check if running in native app
    if (Capacitor.isNativePlatform()) {
        // For native platforms, fallback to download
        // TODO: Implement native printing with Capacitor plugin if needed
        downloadQRCode()
        return
    }

    // For web/browser, use window.print
    window.print()
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
