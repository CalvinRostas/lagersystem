# Test Case TC-007: Search for Storage Location

- Requirement: SRS-007
- Priority: Medium
- Type: System Test (Manual)

## Preconditions
- At least one storage location exists (e.g., "Regal A / Fach 1").
- Search view is available.

## Test Data
- Existing location name: "Regal A / Fach 1"
- Non-existing location name: "Unbekannter Ort"
- Valid storage location QR code (for the existing location)
- Invalid storage location QR code

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Enter existing location name and search | Correct storage location is displayed |
| 2 | Scan valid storage location QR code in search view | Correct storage location is displayed |
| 3 | Enter non-existing location name and search | "No matches found" is displayed |
| 4 | Scan invalid item QR code in search view | "No storage location found" is displayed |

## Actual Result
- Searching by existing name displayed the correct location; scanning the valid location QR code displayed the same location; searching for a non-existing name showed "No matches found"; scanning the invalid QR code showed "No storage location found".

## Status
- Pass

## Notes
- None.
