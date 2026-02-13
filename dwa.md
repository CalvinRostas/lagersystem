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

---

### **Requirement 2: Generate Storage Location QR Code**

# Header
**Title:** Generate Storage Location QR Code
**Number:** SRS-008
**State:** approved
**Priority:** high

# Description
**When** the user selects the “Create Storage Location” function,
**the system shall** provide a form to enter storage location information and generate a QR code representing the location.

# Acceptance Criteria:
- Pre-condition:
  - The user is on the storage location creation view.
- Input data:
  - Location name (mandatory, e.g. “Shelf A”)
  - Location identifier (mandatory, e.g. “Shelf A / Drawer 3”)
  - Optional notes
- Success condition:
  - The system generates a unique QR code encoding the storage location ID.
  - The QR code is displayed after successful creation.
- Validation:
  - Location identifiers must be unique.
- Persistence:
  - Storage location data and QR code are stored persistently.
- Usability:
  - The QR code can be printed or exported.
- Consistency:
  - Scanning the QR code always resolves to the same storage location.
- Verifiability:
  - Scanning the QR code returns the correct storage location ID.

  ---

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

---

# Header
**Title:** Scan Storage Location
**Number:** SRS-002
**State:** approved
**Priority:** high

# Description
When an object has been successfully scanned,
the system shall allow the user to scan a barcode or QR code representing a storage location.

# Acceptance Criteria:
- Pre-condition:
  - An object code has been scanned successfully.
- Success condition:
  - The system displays the storage location identifier (e.g. “Shelf A / Drawer 3”).
- Failure condition:
  - Invalid location codes trigger a clear error message.
- Consistency:
  - The same location code always resolves to the same storage position.

---

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

---

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

---

# Requirement 7: Display Object Details

**Title:** Display Object Information
**Number:** SRS-005
**State:** approved
**Priority:** medium

# Header
**When** an object is retrieved via search,
**the system shall** display object ID and assigned storage location in a structured view.

# Acceptance Criteria:
- Pre-condition:
  - The object exists in the system and has an assigned storage location.
- Content:
  - The object ID is displayed clearly and unambiguously.
  - The assigned storage location is displayed in a human-readable format.
- Usability:
  - The layout is optimized for mobile devices.
  - Text is readable without zooming on standard smartphone screens.
- Consistency:
  - The displayed information matches the stored object-location mapping.
- Verifiability:
  - Given a known object ID, the displayed data matches the database entry.