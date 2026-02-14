/**
 * Represents a trackable item in the inventory.
 */
export interface Item {
  id: string;
  name: string;
  /** Optional description or location. */
  description?: string;
  /** Optional image URL (thumbnail) for the item. */
  imageUrl?: string;
  /** Optional QR code image (data URL) for the item ID. */
  qrCodeDataUrl?: string;
}
