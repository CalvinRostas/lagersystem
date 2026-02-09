<template>
    <section class="rounded-lg border border-border bg-card p-4 shadow-xs">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-lg font-semibold">Objects</h2>
                <p class="text-sm text-muted-foreground">Stored objects and their QR codes.</p>
            </div>
            <span class="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {{ objects.length }} total
            </span>
        </div>

        <div v-if="objects.length === 0" class="mt-4 rounded-md border border-dashed border-border p-4">
            <p class="text-sm text-muted-foreground">No objects yet. Create one above.</p>
        </div>

        <div v-else class="mt-4 overflow-x-auto">
            <table class="w-full text-left text-sm">
                <thead>
                    <tr class="border-b border-border text-muted-foreground">
                        <th class="py-2 pr-4 font-medium">QR</th>
                        <th class="py-2 pr-4 font-medium">Name</th>
                        <th class="py-2 pr-4 font-medium">Object ID</th>
                        <th class="py-2 pr-4 font-medium">Created</th>
                        <th class="py-2 pr-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in objects" :key="item.id" class="border-b border-border/60">
                        <td class="py-3 pr-4">
                            <div class="size-12 rounded-md border border-border bg-white p-1">
                                <img :src="item.qrDataUrl" :alt="`QR ${item.id}`" class="size-full" />
                            </div>
                        </td>
                        <td class="py-3 pr-4 font-medium">{{ item.name }}</td>
                        <td class="py-3 pr-4 font-mono text-xs">{{ item.id }}</td>
                        <td class="py-3 pr-4 text-xs text-muted-foreground">
                            {{ formatDate(item.createdAt) }}
                        </td>
                        <td class="py-3 pr-4">
                            <div class="flex flex-wrap gap-2">
                                <UiButton
                                    as="a"
                                    size="sm"
                                    variant="outline"
                                    :href="item.qrDataUrl"
                                    :download="downloadName(item.name)"
                                    icon="lucide:download"
                                    icon-placement="left"
                                >
                                    Download
                                </UiButton>
                                <UiButton
                                    size="sm"
                                    variant="ghost"
                                    icon="lucide:copy"
                                    icon-placement="left"
                                    @click="copyId(item.id)"
                                >
                                    Copy ID
                                </UiButton>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup lang="ts">
    const { objects, loadObjects } = useObjects();

    onMounted(() => {
        loadObjects();
    });

    const formatDate = (iso: string) => {
        const date = new Date(iso);
        if (Number.isNaN(date.getTime())) return "-";
        return date.toLocaleDateString();
    };

    const downloadName = (name: string) => {
        const safeName = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        return safeName ? `${safeName}-qr.png` : "object-qr.png";
    };

    const copyId = async (id: string) => {
        try {
            await navigator.clipboard.writeText(id);
        } catch {
            // ignore clipboard errors
        }
    };
</script>