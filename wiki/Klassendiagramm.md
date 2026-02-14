classDiagram

class Object {
    -objectId : string
    -name : string 
    -description : string
    -qrCode : QRCode
    +generateQRCode()
    +assignToLocation(location : StorageLocation)
}

class StorageLocation {
    -locationId : string 
    -name : string 
    -notes?description : string
    +generateQRCode()
}

class QRCode {
    -codeValue : string
    -imagePath? : string
    -format? : string
    +generate(data: String)
    +exportAsImage()
    +validate()
}

class Assignment {
    -String assignmentId
    -Date assignedAt
    +createAssignment(object: Object, location: StorageLocation)
    +updateAssignment(location: StorageLocation)
}

class Scanner {
    -List~String~ supportedFormats
    -int timeoutSeconds
    +scan()
    +decode()
    +validateCode()
}

class ObjectRepository {
    +save(object: Object)
    +findById(id: String)
    +exists(id: String)
}

class StorageLocationRepository {
    +save(location: StorageLocation)
    +findById(id: String)
}

class AssignmentRepository {
    +save(assignment: Assignment)
    +findByObjectId(id: String)
}

%% =========================
%% Relationships
%% =========================

Object "1" *-- "1" QRCode : contains
StorageLocation "1" *-- "1" QRCode : contains

Object "1" --> "1" Assignment
StorageLocation "1" --> "0..*" Assignment

Scanner ..> QRCode : decodes

ObjectRepository ..> Object
StorageLocationRepository ..> StorageLocation
AssignmentRepository ..> Assignment
