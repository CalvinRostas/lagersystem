### **Requirement 1: Generate Object QR Code**

# Header
**Title:** Generate Object QR Code
**Number:** SRS-001
**State:** approved
**Priority:** high

# Description
**When** the user selects the “Create Object” function,
**the system shall** provide a form to enter object-related information and generate a QR code representing the object.

# Acceptance Criteria:
- **Pre-condition:**
  - The user is on the object creation view.
- **Input data:**
  - Object name (mandatory)
  - Object ID (automatically generated or manually entered)
  - Optional description (text)
- **Success condition:**
  - The system generates a unique QR code encoding the object ID.
  - The QR code is displayed on the screen after successful form submission.
- **Validation:**
  - Mandatory fields must not be empty.
  - Object IDs must be unique.
- **Persistence:**
  - Object metadata and QR code are stored persistently.
- **Usability:**
  - The user can save or export the QR code (e.g. as image).
- **Verifiability:**
  - Scanning the generated QR code resolves to the correct object ID.