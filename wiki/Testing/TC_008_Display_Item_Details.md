# Test Case TC-008: Display Item Details

- Requirement: SRS-008
- Priority: High
- Type: System Test (Manual)

## Preconditions
- Item exists and has an assigned storage location.
- Item is available via search or list.

## Test Data
- Item: "Hammer"
- Assigned location: "Regal A / Fach 1"

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Open item via search or list selection | Item detail view is displayed |
| 2 | Inspect displayed data | Item info, item QR code, and assigned location are shown clearly |
| 3 | Compare with stored mapping | Displayed location matches stored item-location mapping |
| 4 | Check readability | Text is readable on standard smartphone screen without zooming |

## Actual Result
- Item detail view opened; item info, item QR code, and assigned location were clearly shown; displayed location matched stored mapping; text was readable without zooming.

## Status
- Pass

## Notes
- None.
