setKeyState = function(key) {
  // Return true if a new key is pressed, false if the key was already pressed
  var state = Session.get("keyState");
  if (state == null) {
    console.log("Initializing keystate");
    if (key == -1) {
      state = {}
    } else {
      state = {key: true};
    }
    Session.set("keyState", state);
    return true;
  } else {
    if (state[key]) {
      console.log("Not a new keypress");
      return false;
    } else {
      console.log("Setting new key state1", state);
      state[key] = true;
      console.log("Setting new key state2", state);
      Session.set("keyState", state);
      return true;
    }
  }
};

clearKeyState = function(key) {
  // Returns a list of keys that are still pressed after releasing the given key
  var state = Session.get("keyState");
  state[key] = false;
  var keys = Object.keys(state);
  Session.set("keyState", state);
  return keys.length > 0 ? keys : false;
};

getKeyState = function() {
  var state = Session.get("keyState");
  var keys = Object.keys(state);
  var result = [];
  for (var i=0; i<keys.length; i++) {
    var key = keys[i];
    if (state[key]) {
      result.push(parseInt(key));
    }
  }
  return result;
};

setState = function(key) {
  var state = Session.get("keyState");
  var keys = Object.keys(state);
  var sessionId = Session.get("sessionId");
  if (keys.length == 0) {
      //no key pressed
      Classes.update({_id: sessionId}, {$set: {state: eventStates['silence']}});
      $("#feedback-label").html("No Input");
  } else if (keys.length == 1) { 
    switch(keys[0]) {
      case 75:
        //'K' key pressed
        Classes.update({_id: sessionId}, {$set: {state: eventStates['teacher']}});
        $("#feedback-label").html("Teacher");
        break;
      case 83:
        //'S' key pressed
        Classes.update({_id: sessionId}, {$set: {state: eventStates['student']}});
        $("#feedback-label").html("Student");
        break;
      default:
        $("#feedback-label").html("Invalid Input");
    }
  } else if (keys.length >= 2) {
    if (isInList(75, keys) && isInList(83, keys)) {
      Classes.update({_id: sessionId}, {$set: {state: eventStates['student-teacher']}});
      $("#feedback-label").html("Student-teacher");
    } else {
      $("#feedback-label").html("Invalid Input");
    }
  }
}

getStateColor = function(cond, key) {

  if (cond == str(cond)) {
    switch(key) {
      case -1:
        //no key pressed
        $("#feedback-label").html("No Input");
        break;
      case 75:
        //'K' key pressed
        $("#feedback-label").html("Teacher");
        break;
      case 83:
        //'S' key pressed
        $("#feedback-label").html("Student");
        break;
      default:
        //other key pressed
        $("#feedback-label").html("Student-teacher");
    }
  } else {
    switch(key) {
      case -1:
        //no key pressed
        $("#feedback-label").html("No Input");
        break;
      case 75:
        //'K' key pressed
        $("#feedback-label").html("Teacher");
        break;
      case 83:
        //'S' key pressed
        $("#feedback-label").html("Student");
        break;
      default:
        //other key pressed
        $("#feedback-label").html("Student-teacher");
    }

  }

}
