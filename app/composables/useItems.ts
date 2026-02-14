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

/**
 * Composable for the items list. Replace with real data source (API, Capacitor Storage, etc.) later.
 */
export function useItems() {
  const items = ref<Item[]>([...MOCK_ITEMS]);
  // Use empty list to see empty state: ref<Item[]>([])

  return {
    items,
  };
}
