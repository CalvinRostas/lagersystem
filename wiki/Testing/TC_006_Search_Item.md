# Test Case TC-006: Search for Item

- Requirement: SRS-006
- Priority: High
- Type: System Test (Manual)

## Preconditions
- At least one item exists (e.g., "Hammer").
- Search view is available.

## Test Data
- Existing item name: "Hammer"
- Non-existing item name: "Unbekanntes Item"
- Valid item QR code (for the existing item)
- Invalid item QR code

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Enter existing item name and search | Correct item is displayed |
| 2 | Scan valid item QR code in search view | Correct item is displayed |
| 3 | Enter non-existing item name and search | "No matches found" is displayed |
| 4 | Scan invalid item QR code in search view | "No item found" is displayed |

## Actual Result
- Searching by existing name displayed the correct item; scanning the valid item QR code displayed the same item; searching for a non-existing name showed "No matches found"; scanning the invalid QR code showed "No item found".

## Status
- Pass

## Notes
- None.
