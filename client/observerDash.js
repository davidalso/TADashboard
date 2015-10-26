Template.ObsDash.onRendered(function() {
  $(".key-listener").focus();
  console.log("focusing on key listener input");
  document.onkeydown = keyDownListener;
  document.onkeyup = keyUpListener;
  Session.set("keyState", -1);
});

var keyDownListener = function(evt) {
  var keyState = Session.get("keyState");
  var key = evt.keyCode;
  if (keyState != key) {
    console.log("pressed key", evt.keyCode);
    Session.set("keyState", evt.keyCode);
    setInputState(key);
  }
};

var keyUpListener = function(evt) {
  console.log("released key", evt.keyCode);
  Session.set("keyState", -1);
  setInputState(-1);
}

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
