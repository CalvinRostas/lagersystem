### **Requirement 1: Create Item**

# Header

**Title:** Create Item  
**Number:** SRS-001  
**State:** approved  
**Priority:** high  

# Description

**When** the user selects the "Create Item" function,  
**the system shall** provide a form to enter item-related information and generate a QR code representing the item.

# Acceptance Criteria:

- **Pre-condition:**
  - The user is on the item creation view.
- **Input data:**
  - Item name
  - Description (optional)
  - Storage Location
  - Item Image (optional)
- **Success condition:**
  - The system generates a unique QR code encoding the item ID.
  - The QR code is displayed on the screen after successful form submission.
  - The item informations are displayed on the screen.
- **Validation:**
  - Mandatory fields must not be empty.
  - Item IDs must be unique.
- **Persistence:**
  - Item metadata and QR code are stored persistently.
- **Usability:**
  - The user can save or export the QR code (e.g. as image).
- **Verifiability:**
  - Scanning the generated QR code resolves to the correct Item ID.
