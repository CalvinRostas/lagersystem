<template>
    <div>
        <p>Gegenstände</p>
        <div class="w-full">
            <div class="py-3">
                <UiDivider class="pb-3" />
                <div class="w-full flex items-center px-3">
                    <div class="flex-1">
                        <UiAvatar src="https://picsum.photos/128" alt="Colm Tuite" fallback="CT" :delay-ms="600" />
                    </div>
                    <div class="flex-1">
                        <p>Colm Tuite</p>
                    </div>
                    <div class="flex-1 flex justify-end">
                        <UiButton size="icon" variant="outline">
                            <Icon class="size-4" name="lucide:pen" />
                        </UiButton>
                    </div>
                </div>
                <UiDivider class="pt-3" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>