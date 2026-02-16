# Test Case TC-003: Scan Item QR Code

- Requirement: SRS-003
- Priority: Medium
- Type: System Test (Manual)

## Preconditions
- Camera permission is granted.
- A known test item with a valid QR code exists.

## Test Data
- Valid item QR code (known test item)
- Invalid QR code (unknown item)

## Steps
| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Open "Scan Item" function | Camera view opens with a visual scanning frame |
| 2 | Scan valid item QR code | Item is displayed within 2 seconds |
| 3 | Scan invalid/unknown QR code | "Not found" page is shown |

## Actual Result
- First run failed due to unsupported SDK version; after updating the QR scanner SDK to 26, the camera view opened with scan frame, valid item QR code decoded within 2 seconds and item shown, and invalid QR code showed the Not found page.

## Status
- Pass

## Notes
- Initial failure: SDK version 24 not supported for the QR code scanner. Fix applied: update SDK version to 26. Retest passed.
