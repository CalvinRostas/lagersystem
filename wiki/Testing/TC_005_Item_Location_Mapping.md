# Test Case TC-005: Store Item-Location Mapping

- Requirement: SRS-005
- Priority: High
- Type: System Test (Manual)

## Preconditions
- A test item exists.
- Two storage locations exist (Location A and Location B).

## Test Data
- Item: "Hammer" (existing)
- Location A: "Regal A / Fach 1"

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Assign item to Location A | Mapping is saved within 2 second |
| 2 | Open item details | Location A is shown as assigned location |
| 3 | Restart the app | Mapping is still present after restart |

## Actual Result
- Item assigned to Location A and saved within 2 second; item details showed Location A; mapping persisted after app restart.

## Status
- Pass

## Notes
- None.
