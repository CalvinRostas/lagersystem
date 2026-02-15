import QRCode from "qrcode";

/**
 * Generate a unique identifier using crypto.randomUUID() with fallback
 * @returns {string} A unique identifier string
 */
export function generateId(): string {
    return typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Generate a QR code data URL for the given value
 * @param value - The value to encode in the QR code
 * @returns {Promise<string | undefined>} QR code data URL or undefined if generation fails
 */
export async function generateQRCode(value: string): Promise<string | undefined> {
    try {
        return await QRCode.toDataURL(value, { margin: 1, width: 256 });
    } catch {
        return undefined;
    }
}
