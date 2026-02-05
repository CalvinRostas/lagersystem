<template>
    <div>
        <p>Gegenstände</p>
        <div class="w-full">
            <table class="w-full">
                <thead>
                    <tr>
                        <th>Bild</th>
                        <th>Name</th>
                        <th>Aktion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in 10" :key="i" class="text-center">
                        <td class="flex justify-center items-center">
                            <UiAvatar src="https://picsum.photos/128" alt="Colm Tuite" fallback="CT" :delay-ms="600" />
                        </td>
                        <td>Test</td>
                        <td class="flex items-center justify-center gap-3">
                            <UiButton size="icon" variant="outline">
                                <Icon class="size-4" name="lucide:eye" />
                            </UiButton>
                            <UiButton size="icon" variant="outline">
                                <Icon class="size-4" name="lucide:pen" />
                            </UiButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>