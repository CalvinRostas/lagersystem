# Test Case TC-010: Generate QR Code During Creation

- Requirement: SRS-010
- Priority: High
- Type: System Test (Manual)

## Preconditions
- User can start item and storage location creation.

## Test Data
- Item name: "Zange"
- Storage location name: "Regal C / Fach 3"
- Missing mandatory data case (leave required field empty)

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Create a new item with valid data | Unique item ID generated; QR code displayed immediately |
| 2 | Create a new storage location with valid data | Unique location ID generated; QR code displayed immediately |
| 3 | Attempt creation with missing mandatory data | Error message shown; no QR code generated |
| 4 | Scan the generated QR code (external app ok) | Decoded value matches stored item/location ID |

## Actual Result
- New item creation generated a unique ID and displayed the QR code immediately; new location creation did the same; missing mandatory data showed an error and no QR code; scanning the generated QR codes matched the stored IDs.

## Status
- Pass

## Notes
- None.
