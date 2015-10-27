logEvent = function(type) {
  var sId = Session.get("sessionId");
  var session = Classes.findOne({_id: sId});
var e = new Event(type, session);
  Events.insert(e);
};

logKeyEvent = function(key, isRelease) {
  if (key == 83) {
    if (isRelease) {
      logEvent(eventTypes[2]);
    } else {
      logEvent(eventTypes[1]);
    }
  } else if (key == 75) {
    if (isRelease) {
      logEvent(eventTypes[4]);
    } else {
      logEvent(eventTypes[3]);
    }

  }
};
