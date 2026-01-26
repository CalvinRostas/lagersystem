### **Requirement 6: Search for Object**

# Header
**Title:** Search Stored Objects
**Number:** SRS-004
**State:** approved
**Priority:** high

# Description
**When** the user enters an object ID or scans an object code in the search view,
**the system shall** retrieve and display the associated storage location.

# Acceptance Criteria:
- Pre-condition:
    - The object exists in the system.
- Success condition:
    - The correct storage location is displayed clearly.
- Failure condition:
    - If the object is not found, the system displays “Object not found”.
- Usability:
    - Search can be triggered via text input or barcode scan.