# Test Case TC-002: Create Storage Location

- Requirement: SRS-002
- Priority: High
- Type: System Test (Manual)

## Preconditions
- App is installed and running.
- User is on the index view.

## Test Data
- Location name: "Regal A / Fach 1"
- Location description: "Metallregal" (optional)

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Open "Create Storage Location" view | Form is displayed with fields for name and description |
| 2 | Leave mandatory fields empty and submit | Validation message shown; location not created; no QR code generated |
| 3 | Enter required fields and submit | Location created; unique location ID generated; QR code displayed; location details shown |
| 4 | Scan generated QR code | Scan resolves to the new storage location |
| 5 | Export/print QR code | QR code can be saved or printed |

## Actual Result
- Form displayed; empty submit showed validation and no QR code; valid submit created location with unique ID and QR code; scan resolved to new location; QR code saved/printed successfully.

## Status
- Pass

## Notes
- None.
