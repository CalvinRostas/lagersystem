### **Requirement 6: Search for Item**

# Header

**Title:** Search Stored Item
**Number:** SRS-006
**State:** approved
**Priority:** high

# Description

**When** the user enters an item name or scans an item qr code in the search view,
**the system shall** retrieve and display the associated storage location.

# Acceptance Criteria:

- **Pre-condition:**
  - The item exists in the system.
- **Success condition:**
  - The correct item is displayed clearly.
- **Failure condition:**
  - If the Item is not found, the system displays “Item not found”.
- **Usability:**
  - Search can be triggered via text input or qr code scan.
