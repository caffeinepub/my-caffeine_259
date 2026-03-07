import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Iter "mo:core/Iter";

actor {
  type CampInfo = {
    name : Text;
    location : Text;
    timing : Text;
    instructor : Text;
  };

  type AdmissionEntry = {
    yogaCode : Text;
    name : Text;
    address : Text;
    contact : Text;
    email : Text;
    dateOfBirth : Text;
    idProof : Text;
    submittedAt : Int;
    idProofFileUrl : ?Storage.ExternalBlob;
  };

  type AttendanceRecord = {
    yogaCode : Text;
    present : Bool;
  };

  let camps = Map.empty<Text, CampInfo>();
  let admissions = Map.empty<Text, AdmissionEntry>();
  var admissionCounter = 0;

  // New: Track attendance records by date (persistent Map)
  let attendanceByDate = Map.empty<Text, Map.Map<Text, Bool>>();

  include MixinStorage();

  public shared ({ caller }) func addCamp(name : Text, location : Text, timing : Text, instructor : Text) : async () {
    if (camps.containsKey(name)) {
      Runtime.trap("Camp with this name already exists");
    };
    let campInfo : CampInfo = {
      name;
      location;
      timing;
      instructor;
    };
    camps.add(name, campInfo);
  };

  public query ({ caller }) func getCamp(name : Text) : async CampInfo {
    switch (camps.get(name)) {
      case (null) {
        Runtime.trap("Camp not found");
      };
      case (?camp) {
        camp;
      };
    };
  };

  public query ({ caller }) func getAllCamps() : async [CampInfo] {
    camps.values().toArray();
  };

  public shared ({ caller }) func submitAdmission(
    name : Text,
    address : Text,
    contact : Text,
    email : Text,
    dateOfBirth : Text,
    idProof : Text,
    idProofFileUrl : ?Storage.ExternalBlob,
  ) : async Text {
    let newCodeNumber = admissionCounter + 1;
    let codeStr = newCodeNumber.toText();
    let yogaCode = "YOGA" # codeStr;

    let entry : AdmissionEntry = {
      yogaCode;
      name;
      address;
      contact;
      email;
      dateOfBirth;
      idProof;
      submittedAt = Time.now();
      idProofFileUrl;
    };

    admissions.add(yogaCode, entry);
    admissionCounter := newCodeNumber;

    yogaCode;
  };

  public query ({ caller }) func getAllAdmissions(username : Text, password : Text) : async [AdmissionEntry] {
    checkCredentials(username, password);
    admissions.values().toArray();
  };

  public query ({ caller }) func getAdmissionCount() : async Nat {
    admissions.size();
  };

  func checkCredentials(username : Text, password : Text) {
    if (username != "Tushar 5522" or password != "Yoga@32752") {
      Runtime.trap("Unauthorized access: Invalid credentials provided");
    };
  };

  /// New: Save attendance records for a specific date
  public shared ({ caller }) func saveAttendance(
    date : Text,
    records : [(Text, Bool)],
    username : Text,
    password : Text,
  ) : async () {
    checkCredentials(username, password);
    let dailyRecords = Map.empty<Text, Bool>();

    for ((yogaCode, present) in records.values()) {
      dailyRecords.add(yogaCode, present);
    };

    attendanceByDate.add(date, dailyRecords);
  };

  /// New: Get attendance records for a specific date
  public query ({ caller }) func getAttendance(
    date : Text,
    username : Text,
    password : Text,
  ) : async [AttendanceRecord] {
    checkCredentials(username, password);

    switch (attendanceByDate.get(date)) {
      case (null) { [] };
      case (?dailyRecords) {
        dailyRecords.entries().toArray().map(func((yogaCode, present)) { { yogaCode; present } });
      };
    };
  };

  /// New: Get all dates with saved attendance records
  public query ({ caller }) func getAttendanceDates(username : Text, password : Text) : async [Text] {
    checkCredentials(username, password);
    attendanceByDate.keys().toArray();
  };
};
