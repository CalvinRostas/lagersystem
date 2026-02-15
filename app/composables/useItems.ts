import { generateId, generateQRCode } from "~/utils/entity-helpers";

export type Item = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  qrCodeDataUrl?: string;
  storageLocationId?: string;
};

/** Optional mock data – remove or replace with real data source (API, Capacitor Storage, etc.). */
const MOCK_ITEMS: Item[] = [
  {
    id: "mock-1",
    name: "Laptop Dell XPS 15",
    description: "Development laptop, shelf A1",
    imageUrl: "https://picsum.photos/seed/item1/200/200",
    storageLocationId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  },
  {
    id: "mock-2",
    name: "USB-C Hub",
    imageUrl: "https://picsum.photos/seed/item2/200/200",
    storageLocationId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  },
  {
    id: "mock-3",
    name: 'Monitor LG 27"',
    description: "Desk setup, warehouse section B",
    imageUrl: "https://picsum.photos/seed/item3/200/200",
    storageLocationId: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
  },
  {
    id: "mock-4",
    name: "Keyboard Mechanical",
    imageUrl: "https://picsum.photos/seed/item4/200/200",
    storageLocationId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  },
  {
    id: "mock-5",
    name: "Toolbox Set",
    description: "Maintenance tools, storage room",
    imageUrl: "https://picsum.photos/seed/item5/200/200",
    storageLocationId: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
  },
  {
    id: "mock-6",
    name: "Projector Epson",
    imageUrl: "https://picsum.photos/seed/item6/200/200",
    storageLocationId: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
  },
  {
    id: "mock-7",
    name: "Cable Box Assorted",
    description: "HDMI, USB, Ethernet cables",
    imageUrl: "https://picsum.photos/seed/item7/200/200",
    storageLocationId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  },
  {
    id: "mock-8",
    name: "Office Chair",
    imageUrl: "https://picsum.photos/seed/item8/200/200",
    storageLocationId: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
  },
  {
    id: "mock-9",
    name: "Whiteboard Mobile",
    description: "Meeting room 2",
    imageUrl: "https://picsum.photos/seed/item9/200/200",
    storageLocationId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  },
  {
    id: "mock-10",
    name: "Headset Wireless",
    imageUrl: "https://picsum.photos/seed/item10/200/200",
    storageLocationId: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
  },
];

const STORAGE_KEY = "lagersystem-items";
const items = useLocalStorage<Item[]>(STORAGE_KEY, [...MOCK_ITEMS]);
// const itemTemp: Item[] = []
/**
 * Composable for the items list. Replace with real data source (API, Capacitor Storage, etc.) later.
 */
export const useItems = () => {
  const getAll = () => items.value;

  const getById = (id: string) => items.value.find((item) => item.id === id);

  const getByStorageLocation = (storageLocationId: string) =>
    items.value.filter((item) => item.storageLocationId === storageLocationId);

  const create = async (payload: Omit<Item, "id" | "qrCodeDataUrl">) => {
    const id = generateId();
    const qrCodeDataUrl = await generateQRCode(id);

    const newItem: Item = {
      id,
      name: payload.name,
      description: payload.description?.trim()
        ? payload.description.trim()
        : undefined,
      imageUrl: payload.imageUrl,
      qrCodeDataUrl,
      storageLocationId: payload.storageLocationId,
    };

    items.value = [newItem, ...items.value];
    return newItem;
  };

  const remove = (id: string) => {
    const index = items.value.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    items.value.splice(index, 1);
    return true;
  };

  const update = (id: string, changes: Partial<Omit<Item, "id">>) => {
    const item = items.value.find((item) => item.id === id);
    if (!item) {
      return false;
    }
    Object.assign(item, changes);
    return true;
  };

  return {
    items,
    // itemTemp,
    getAll,
    getById,
    getByStorageLocation,
    create,
    remove,
    update,
  };
};

// async function create(payload: Omit<Item, "id" | "qrCodeDataUrl">) {
//   const id = typeof crypto !== "undefined" && "randomUUID" in crypto
//     ? crypto.randomUUID()
//     : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

//   let qrCodeDataUrl: string | undefined;
//   try {
//     qrCodeDataUrl = await QRCode.toDataURL(id, { margin: 1, width: 256 });
//   } catch {
//     qrCodeDataUrl = undefined;
//   }

//   const newItem: Item = {
//     id,
//     name: payload.name,
//     description: payload.description?.trim() ? payload.description.trim() : undefined,
//     imageUrl: payload.imageUrl,
//     qrCodeDataUrl,
//   };

//   items.value = [newItem, ...items.value];
//   return newItem;
// }
