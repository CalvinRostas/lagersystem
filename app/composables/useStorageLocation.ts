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
export const useUseStorageLocation = () => {
  /**
   * Returns all storage locations.
   * @returns {StorageLocation[]} Array of all storage locations
   */
  const getAll = () => storageLocations.value

  /**
   * Finds a storage location by its unique ID.
   * @param {string} id - The ID of the storage location to retrieve
   * @returns {StorageLocation | undefined} The found storage location or undefined if not found
   */
  const getById = (id: string) =>
    storageLocations.value.find((location) => location.id === id)

  /**
   * Creates a new storage location and adds it to the list.
   * Generates a unique ID and QR code for the location.
   * @param {Omit<StorageLocation, "id" | "qrCodeDataUrl">} payload - The location data without ID and QR code
   * @returns {Promise<StorageLocation>} The newly created storage location
   */
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

  /**
   * Removes a storage location by its ID.
   * @param {string} id - The ID of the storage location to remove
   * @returns {boolean} True if the location was removed, false if not found
   */
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

  /**
   * Updates an existing storage location with the given changes.
   * @param {string} id - The ID of the storage location to update
   * @param {Partial<StorageLocation>} changes - The changes to apply
   * @returns {boolean} True if the location was updated, false if not found
   */
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
    getAll,
    getById,
    create,
    remove,
    update,
  }
}
