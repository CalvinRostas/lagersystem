### **Requirement 5: Store Item–Location Mapping**

# Header

**Title:** Store Item Location Assignment
**Number:** SRS-005
**State:** approved
**Priority:** high

# Description

**When** both an item code and a storage location code are available,
**the system shall** store the relationship between item and storage location persistently.

# Acceptance Criteria:

- **Success condition:**
  - The item-location pair is saved in the local storage and remains available after app restart.
- **Integrity:**
  - An item can be assigned to only one active location at a time.
- **Performance:**
  - Storage operation completes within 1 second.

---

- **Overwrite rule:**
  - If an item is re-assigned, the previous location is replaced.
