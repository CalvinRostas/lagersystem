# Header
**Title:** Scan Object QR Code  
**Number:** SRS_001  
**State:** approved  
**Priority:** high  

# Description
**When** the user selects the “Scan Object” function,  
**the system shall** activate the device camera and scan a barcode or QR code representing an object.

# Acceptance Criteria
- Pre-condition:
    - The user has granted camera permissions.
- Success condition:
    - The system correctly recognizes the barcode / QR code and displays the decoded object ID within 2 seconds.
- Failure condition:
    - After 5 seconds of not scanning a barcode / QR code show a info text.
- Usability:
    - A visual scanning frame is displayed to guide the user.
- Technical constraint:
    - The system supports common barcode formats (e.g. EAN-13, Code 128) and QR codes.
- Verifiability:
    - Scan result matches the encoded value of a known test barcode / QR Code.