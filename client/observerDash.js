Template.ObsDash.onRendered(function() {
  $(".key-listener").focus();
  console.log("focusing on key listener input");
  document.onkeydown = keyDownListener;
  document.onkeyup = keyUpListener;
  // Initialize state variables
  Session.set("keyState", {});
  setState(-1);
  Tracker.autorun(updateKeyState);
});

var keyDownListener = function(evt) {
  var newKey = setKeyState(parseInt(evt.keyCode));
  var state = Session.get("keyState");
  console.log("pressed key", state);
  // var keyState = Session.get("keyState");
  // var key = evt.keyCode;
  // if (keyState != key) {
    // if (key == 75 || key == 82) {
// 
    // console.log("pressed key", evt.keyCode);
    // Session.set("keyState", evt.keyCode);
    // setInputState(key);
  // }
};

var keyUpListener = function(evt) {

  console.log("released key", evt.keyCode);
  clearKeyState(parseInt(evt.keyCode));
  //setInputState(-1);
}


var updateKeyState = function() {
  var state = Session.get("keyState");
  var keys = getKeyState();
  console.log("updating key state", keys);
  if (keys.length == 0) {
      //no key pressed
      $("#feedback-label").html("No Input");
  } else if (keys.length == 1) { 
    console.log("one key pressed", keys[0]);
    switch(keys[0]) {
      case 75:
        //'K' key pressed
        console.log("k pressed");
        $("#feedback-label").html("Teacher");
        break;
      case 83:
        //'S' key pressed
        console.log("s pressed");
        $("#feedback-label").html("Student");
        break;
      default:
        console.log("invalid input pressed");
        $("#feedback-label").html("Invalid Input");
    }
  } else if (keys.length >= 2) {
    console.log("two keys pressed", keys);
    if (isInList(75, keys) && isInList(83, keys)) {
      $("#feedback-label").html("Student-teacher");
    } else {
      $("#feedback-label").html("Invalid Input");
    }
  }

};

var setInputState = function(key) {
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
};
