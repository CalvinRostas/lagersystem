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