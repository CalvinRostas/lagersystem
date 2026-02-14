import QRCode from "qrcode";
import type { Item } from "~/types/item";

/** Optional mock data – remove or replace with real data source (API, Capacitor Storage, etc.). */
const MOCK_ITEMS: Item[] = [
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
  {
    id: "1",
    name: "Sample Item 1",
    description: "Description or location",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
  },
  {
    id: "2",
    name: "Sample Item 2",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
  },
];

const STORAGE_KEY = "lagersystem-items";

/**
 * Composable for the items list. Replace with real data source (API, Capacitor Storage, etc.) later.
 */
export function useItems() {
  const items = useLocalStorage<Item[]>(STORAGE_KEY, [...MOCK_ITEMS]);
  // Use empty list to see empty state: useLocalStorage<Item[]>(STORAGE_KEY, [])

  async function addItem(payload: Omit<Item, "id">) {
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let qrCodeDataUrl: string | undefined;
    try {
      qrCodeDataUrl = await QRCode.toDataURL(id, { margin: 1, width: 256 });
    } catch {
      qrCodeDataUrl = undefined;
    }
    const newItem: Item = {
      id,
      name: payload.name,
      description: payload.description?.trim() ? payload.description.trim() : undefined,
      imageUrl: payload.imageUrl,
      qrCodeDataUrl,
    };

    items.value = [newItem, ...items.value];
    return newItem;
  }

  return {
    items,
    addItem,
  };
}
