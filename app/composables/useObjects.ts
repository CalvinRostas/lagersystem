export type StoredObject = {
    id: string;
    name: string;
    description?: string;
    qrDataUrl: string;
    createdAt: string;
};

const STORAGE_KEY = "lagersystem.objects";

const readStorage = (): StoredObject[] => {
    if (typeof window === "undefined") return [];

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as StoredObject[];
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch {
        return [];
    }
};

const writeStorage = (items: StoredObject[]): void => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useObjects = () => {
    const objects = useState<StoredObject[]>("objects", () => []);
    const initialized = useState<boolean>("objects-initialized", () => false);

    const loadObjects = () => {
        if (initialized.value) return;
        objects.value = readStorage();
        initialized.value = true;
    };

    const refreshObjects = () => {
        objects.value = readStorage();
        initialized.value = true;
    };

    const isUniqueId = (id: string) => !objects.value.some((item) => item.id === id);

    const generateUniqueId = () => {
        let attempts = 0;

        while (attempts < 10) {
            let candidate = "";

            if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
                candidate = crypto.randomUUID();
            } else {
                const suffix = Math.random().toString(36).slice(2, 8);
                candidate = `obj-${Date.now()}-${suffix}`;
            }

            if (isUniqueId(candidate)) return candidate;
            attempts += 1;
        }

        return "";
    };

    const addObject = (item: StoredObject) => {
        const next = [item, ...objects.value];
        objects.value = next;
        writeStorage(next);
    };

    const getById = (id: string) => objects.value.find((item) => item.id === id);

    return {
        objects,
        loadObjects,
        refreshObjects,
        addObject,
        getById,
        isUniqueId,
        generateUniqueId,
    };
};
