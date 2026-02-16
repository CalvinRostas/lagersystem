# Test Case TC-004: Scan Storage Location QR Code

- Requirement: SRS-004
- Priority: Medium
- Type: System Test (Manual)

## Preconditions
- Camera permission is granted.
- A known test storage location with a valid QR code exists.

## Test Data
- Valid storage location QR code (known location)
- Invalid QR code (unknown location)

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Open "Scan Storage Location" function | Camera view opens with a visual scanning frame |
| 2 | Scan valid location QR code | Storage location is displayed within 2 seconds |
| 3 | Scan invalid/unknown QR code | "Not found" page is shown |

## Actual Result
- Camera view opened with scan frame; valid location QR code displayed the correct location; and invalid QR code showed the Not found page.

## Status
- Pass

## Notes
- None.
