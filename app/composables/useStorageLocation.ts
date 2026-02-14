export type StorageLocation = {
  id: string
  name: string
  description: string
}

const storageLocations = ref<StorageLocation[]>([
  { id: 'sl-001', name: 'Hauptlager', description: 'Zentrales Lager im EG' },
  { id: 'sl-002', name: 'Regal A3', description: 'Gang A, Regal 3' },
  { id: 'sl-003', name: 'Kuehlraum 1', description: 'Temperiert fuer verderbliche Ware' },
])

export const useUseStorageLocation = () => {
  const getAll = () => storageLocations.value

  const getById = (id: string) =>
    storageLocations.value.find((location) => location.id === id)

  const create = (location: StorageLocation) => {
    const exists = storageLocations.value.some(
      (item) => item.id === location.id,
    )
    if (exists) {
      return false
    }
    storageLocations.value.push(location)
    return true
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
    getAll,
    getById,
    create,
    remove,
    update,
  }
}
