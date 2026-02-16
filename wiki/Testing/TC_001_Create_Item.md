# Test Case TC-001: Create Item

- Requirement: SRS-001
- Priority: High
- Type: System Test (Manual)

## Preconditions
- App is installed and running.
- User is on the index view.
- At least one storage location exists.

## Test Data
- Item name: "Hammer"
- Description: "Stahlhammer"
- Storage location: "Regal A / Fach 1"
- Item image: Sample image file (optional)

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Open "Create Item" view | Form is displayed with fields for name, description, storage location, image |
| 2 | Leave mandatory fields empty and submit | Validation message shown; item not created; no QR code generated |
| 3 | Enter required fields and submit | Item created; unique item ID generated; QR code displayed; item info shown |
| 4 | Scan generated QR code | Scan resolves to the new item |
| 5 | print/save QR code | QR code file is printed/downloaded |

## Actual Result
- Form displayed with all fields; empty submit showed validation and no QR code; valid submit created item with unique ID and QR code; scan resolved to new item; QR code saved/printed successfully.

## Status
- Pass

## Notes
- None.
