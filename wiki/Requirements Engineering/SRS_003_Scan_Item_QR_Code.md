### **Requirement 4: Scan Item QR Code**

# Header

**Title:** Scan Item QR Code  
**Number:** SRS-003
**State:** approved  
**Priority:** medium

# Description

**When** the user selects the “Scan Item” function,  
**the system shall** activate the device camera and scan a barcode or QR code representing an item.

# Acceptance Criteria

- **Pre-condition:**
  - The user has granted camera permissions.
- **Success condition:**
  - The system correctly recognizes the QR code and displays the item within 2 seconds.
- **Failure condition:**
  - If no result for the QR code is found a "Not found" page will be shown.
- **Consistency:**
  - The same location code always resolves to the same storage position.
- **Usability:**
  - A visual scanning frame is displayed to guide the user.
- **Technical constraint:**
  - The system supports common QR codes.
- **Verifiability:**
  - Scan result matches the encoded value of a known test QR Code.
