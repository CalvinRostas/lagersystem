### **Requirement 5: Store Object–Location Mapping**

# Header
**Title:** Store Object Location Assignment
**Number:** SRS-003
**State:** approved
**Priority:** high

# Description
**When** both an object code and a storage location code are available,
**the system shall** store the relationship between object and storage location persistently.

# Acceptance Criteria:
- **Success condition:**
  - The object-location pair is saved in the database and remains available after app restart.
- **Integrity:**
  - An object can be assigned to only one active location at a time.
- **Overwrite rule:**
  - If an object is re-assigned, the previous location is replaced.
- **Performance:**
  - Storage operation completes within 1 second.