# Header
**Title:** Scan Storage Location
**Number:** SRS-002
**State:** approved
**Priority:** high

# Description
When an object has been successfully scanned,
the system shall allow the user to scan a barcode or QR code representing a storage location.

# Acceptance Criteria:
- Pre-condition:
  - An object code has been scanned successfully.
- Success condition:
  - The system displays the storage location identifier (e.g. “Shelf A / Drawer 3”).
- Failure condition:
  - Invalid location codes trigger a clear error message.
- Consistency:
  - The same location code always resolves to the same storage position.