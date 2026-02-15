import { generateId, generateQRCode } from "~/utils/entity-helpers";

export type StorageLocation = {
  id: string
  name: string
  description?: string
  qrCodeDataUrl?: string
}

const MOCK_STORAGE_LOCATIONS: StorageLocation[] = [
  { id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', name: 'Hauptlager', description: 'Zentrales Lager im EG' },
  { id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', name: 'Regal A3', description: 'Gang A, Regal 3' },
  { id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', name: 'Kuehlraum 1', description: 'Temperiert fuer verderbliche Ware' },
]

const STORAGE_KEY = "lagersystem-storage-locations";
const storageLocations = useLocalStorage<StorageLocation[]>(STORAGE_KEY, [...MOCK_STORAGE_LOCATIONS]);
// const storageTemp: StorageLocation[] = []
export const useUseStorageLocation = () => {
  const getAll = () => storageLocations.value

  const getById = (id: string) =>
    storageLocations.value.find((location) => location.id === id)

  const create = async (payload: Omit<StorageLocation, "id" | "qrCodeDataUrl">) => {
    const id = generateId();
    const qrCodeDataUrl = await generateQRCode(id);

    const newLocation: StorageLocation = {
      id,
      name: payload.name,
      description: payload.description?.trim() ? payload.description.trim() : "",
      qrCodeDataUrl,
    };

    storageLocations.value = [newLocation, ...storageLocations.value];
    return newLocation;
  }

  const remove = (id: string) => {
    const index = storageLocations.value.findIndex(
      (location) => location.id === id,
    )
    if (index === -1) {
      return false
    }
    storageLocations.value.splice(index, 1)
    return true
  }

  const update = (id: string, changes: Partial<StorageLocation>) => {
    const location = storageLocations.value.find(
      (item) => item.id === id,
    )
    if (!location) {
      return false
    }
    Object.assign(location, changes)
    return true
  }

  return {
    storageLocations,
    // storageTemp,
    getAll,
    getById,
    create,
    remove,
    update,
  }
}
