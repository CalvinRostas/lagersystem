# Test Case TC-009: Display Storage Location Details

- Requirement: SRS-009
- Priority: High
- Type: System Test (Manual)

## Preconditions
- Storage location exists and has assigned items.
- Location is available via search or list.

## Test Data
- Storage location: "Regal A / Fach 1"
- Assigned items: "Hammer", "Schrauben" (example)

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Open storage location via search or list selection | Location detail view is displayed |
| 2 | Inspect displayed data | Location info, location QR code, and assigned items are shown clearly |
| 3 | Compare with stored mapping | Displayed items match stored item-location mapping |
| 4 | Check readability | Text is readable on standard smartphone screen without zooming |

## Actual Result
- Location detail view opened; location info, location QR code, and assigned items were clearly shown; displayed items matched stored mapping; text was readable without zooming.

## Status
- Pass

## Notes
- None.
