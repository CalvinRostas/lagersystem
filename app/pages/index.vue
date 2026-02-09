<template>
    <IonPage>
        <div class="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4">
            <div class="space-y-2">
                <h1 class="text-2xl font-semibold">Create object QR code</h1>
                <p class="text-sm text-muted-foreground">
                    Store object metadata, generate a QR code, and keep everything in one place.
                </p>
            </div>

            <ObjectCreateForm />

            <UiDivider />

            <ItemTable />
        </div>
    </IonPage>
</template>

<script setup lang="ts"></script>