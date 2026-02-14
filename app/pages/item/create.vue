<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Item erstellen</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent :fullscreen="true" class="ion-padding">
            <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
                <IonList class="ion-no-padding">
                    <IonItem lines="full">
                        <IonLabel position="stacked">Name *</IonLabel>
                        <IonInput v-model="name" type="text" placeholder="Name eingeben"
                            :aria-invalid="nameTouched && name.trim().length === 0" :aria-describedby="nameErrorId"
                            @ionBlur="nameTouched = true" />
                    </IonItem>
                    <IonText v-if="nameTouched && name.trim().length === 0" color="danger" :id="nameErrorId">
                        <p class="mt-2">Name ist erforderlich.</p>
                    </IonText>

                    <IonItem lines="full">
                        <IonLabel position="stacked">Beschreibung</IonLabel>
                        <IonTextarea v-model="description" placeholder="Beschreibung eingeben" :auto-grow="true" />
                    </IonItem>
                </IonList>

                <IonButton type="submit" expand="block" :disabled="name.trim().length === 0">
                    Speichern
                </IonButton>
            </form>
        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
import { useItems } from "~/composables/useItems"

defineOptions({
    name: "CreateItem",
})

useHead({
    title: "Item erstellen",
})

const { addItem } = useItems()

const router = useIonRouter()

const name = ref("")
const description = ref("")
const nameTouched = ref(false)
const nameErrorId = "item-name-error"

async function onSubmit() {
    nameTouched.value = true
    if (name.value.trim().length === 0) {
        return
    }

    const created = await addItem({
        name: name.value.trim(),
        description: description.value,
    })

    name.value = ""
    description.value = ""
    nameTouched.value = false

    router.push(`/item/${created.id}`)
}
</script>
