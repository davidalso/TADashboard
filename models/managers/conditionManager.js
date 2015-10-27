setKeyState = function(key) {
  // Return true if a new key is pressed, false if the key was already pressed
  var state = Session.get("keyState");
  if (state == null) {
    ////console.log("Initializing keystate");
    if (key == -1) {
      state = {}
    } else {
      state = {key: true};
      setState();
    }
    Session.set("keyState", state);
    return true;
  } else {
    if (state[key]) {
      ////console.log("Not a new keypress");
      return false;
    } else {
      state[key] = true;
      //console.log("Setting new key state", state);
      Session.set("keyState", state);
      setState();
      return true;
    }
  }
};

clearKeyState = function(key) {
  // Returns a list of keys that are still pressed after releasing the given key
  var state = Session.get("keyState");
  state[key] = false;
  var keys = Object.keys(state);
  //console.log("clearing key from state", state);
  Session.set("keyState", state);
  setState();
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

setState = function() {
  var keys = getKeyState();
  var sessionId = Session.get("sessionId");
  var state = Classes.findOne({_id: sessionId});
  // //console.log("Updating Class state", state, keys);
  if (keys.length == 0) {
    state['lastState'] = state['state'];
    state['state'] = eventStates['silence'];
    waitTimer(3000, eventStates['silence']);
  } else if (keys.length == 1) {
    
    switch(keys[0]) {
      case 75:
        //Entering Teacher State
        ////console.log("entering teacher state");
        state['lastState'] = state['state'];
        state['state'] = eventStates['teacher'];
        break;
      case 83:
        //Entering Student State
        ////console.log("entering student state");
        state['lastState'] = state['state'];
        state['state'] = eventStates['student'];
        break;
    }

  } else {
      if (isInList(75, keys) && isInList(83, keys)) {
        //Entering Teacher-Student State
        ////console.log("entering teacher-student state");
        state['lastState'] = state['state'];
        state['state'] = eventStates['student-teacher'];
      }
  }
  Classes.update({_id: sessionId}, {$set: {'state': state['state'], 'lastState': state['lastState']}});
  
  //console.log("Updating Class state", state);
}

waitTimer = function(sec, state) {
  // Set state to given state after given time interval
  var sId = Session.get("sessionId");
  
  Meteor.setTimeout(function() {
    var session = Classes.findOne({_id: sId});
    session['lastState'] = session['state'];
    session['state'] = state;
    Classes.update({_id: sId}, {$set: {state: session['state'], lastState: session['lastState']}});
  }, sec);

}

getStateColor = function(cond, state, lastState) {
  // Define ta dashboard color state machine
  // cond 1:
  //    -- Teacher or student = [orange] (1)
  //    -- Silence < 3 = [orange, green] (2)
  //    -- Silence >=3 = [green] (3)
  // cond 2:
  //    -- Teacher = [orange] (1)
  //    -- Student = [green] (3) 
  //    -- Silence < 3 after Teacher = [orange, blue] (4)
  //    -- Silence < 3 after Student = [green, blue] (5)
  //    -- Silence > 3 = [blue] (6)

  if (cond == '1') {
    if (state == 'student' || state == 'teacher' || state == 'student-teacher') {
      return visualState[1];
    } else if (state == 'silence' && (lastState == 'student' || lastState == 'teacher')) {
      return visualState[2];
    } else {
      // Silent state
      return visualState[3];
    }
  } else {
    if (state == 'student') {
      return visualState[3];
    } else if (state == 'teacher' || state == 'student-teacher') {
      return visualState[1];
    } else if (state == 'silence' && (lastState == 'teacher' || lastState == 'student-teacher')) {
      return visualState[4];
    } else if (state == 'silence' && lastState == 'student') {
      return visualState[5];
    } else {
      // Silent state
      return visualState[6];
    }
  
  
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
