import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type CampInfo = {
    name : Text;
    location : Text;
    timing : Text;
    instructor : Text;
  };

  let camps = Map.empty<Text, CampInfo>();

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
};
