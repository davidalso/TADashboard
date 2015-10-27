Template.ObsDash.onRendered(function() {
  document.onkeydown = keyDownListener;
  document.onkeyup = keyUpListener;
  // Initialize state variables
  Session.set("keyState", {});
  Tracker.autorun(updateKeyState);
  Tracker.autorun(updateTADash);
});

Template.ObsDash.helpers({
  getDesc: function() {
    var sId = Session.get("sessionId");
    var c = Classes.findOne({_id: sId});
    return c.desc;
  },
});
var keyDownListener = function(evt) {
  var newKey = setKeyState(parseInt(evt.keyCode));
  var state = Session.get("keyState");
  // //console.log("pressed key", state);
};

var keyUpListener = function(evt) {
  // //console.log("released key", evt.keyCode);
  clearKeyState(parseInt(evt.keyCode));
  //setInputState(-1);
}


var updateKeyState = function() {
  var state = Session.get("keyState");
  var keys = getKeyState();
  // //console.log("updating key state", keys);
  if (keys.length == 0) {
      //no key pressed
      $("#feedback-label").html("No Input");
  } else if (keys.length == 1) { 
    // //console.log("one key pressed", keys[0]);
    switch(keys[0]) {
      case 75:
        //'K' key pressed
        // //console.log("k pressed");
        $("#feedback-label").html("Teacher");
        break;
      case 83:
        //'S' key pressed
        // //console.log("s pressed");
        $("#feedback-label").html("Student");
        break;
      default:
        // //console.log("invalid input pressed");
        $("#feedback-label").html("Invalid Input");
    }
  } else if (keys.length >= 2) {
    // //console.log("two keys pressed", keys);
    if (isInList(75, keys) && isInList(83, keys)) {
      $("#feedback-label").html("Student-teacher");
    } else {
      $("#feedback-label").html("Invalid Input");
    }
  }

};

var updateTADash = function() {
  //console.log("******************************************");
  var sessionId = Session.get("sessionId");
  var session = Classes.findOne({_id: sessionId});
  var stateColors = getStateColor(session['cond'], session['state'], session['lastState']);
  //console.log("updating TA Dash state", stateColors);
  if (stateColors.length == 1) {
    $(".ta-view .view").css("background", colors[stateColors[0]]);
  } else if (stateColors.length == 2) {
    Blaze.render(Template.AnimationView, $(".ta-view .view")[0]);
    $(".ta-view .animation-view").css("background", colors[stateColors[1]]);
    var counter = 0;
    var animateView = function() {
      counter++;
      var width = counter.toString() + '%';
      $(".ta-view .animation-view").css("width", width);
      //console.log("animating", interval, counter);
      if (counter >= 99) {
        // var interval = Session.get("timeout");
        Meteor.clearInterval(interval);
        $(".ta-view .view").css("background", colors[stateColors[1]]);
        $(".ta-view .animation-view").remove();
      }
    };
    // Meteor.setTimeout(function() {
      // var interval = Meteor.setInterval(animateView, 15);
      // Session.set("timeout", interval);
    // }, 1500);
    var interval = Meteor.setInterval(animateView, 30);
    
  }
};
