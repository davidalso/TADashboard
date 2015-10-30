Template.ObsDash.onRendered(function() {
  document.onkeydown = keyDownListener;
  document.onkeyup = keyUpListener;
  // Initialize state variables
  Session.set("keyState", {});
  Session.set("animate-timeout", null);
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
};

var keyUpListener = function(evt) {
  clearKeyState(parseInt(evt.keyCode));
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
    } else if (isInList(75, keys)) {
      $("#feedback-label").html("Teacher");
    } else if (isInList(83, keys)) {
      $("#feedback-label").html("Student");
    } else {
      $("#feedback-label").html("Invalid Input");
    }
  }

};

var updateTADash = function() {
  //console.log("******************************************");
  var sessionId = Session.get("sessionId");
  var session = Classes.findOne({_id: sessionId});
  console.log("Updating dash view", session);
  if (session != null) {
    var stateColors = getStateColor(session['cond'], session['state']);
    //console.log("updating TA Dash state", stateColors);
    if (stateColors.length == 1) {
      $(".ta-view .view").css("background", colors[stateColors[0]]);
      var animateInt = Session.get("animate-timeout");
      if (animateInt != null) {
          Meteor.clearInterval(animateInt);
          Session.set("animate-timeout", null);
          $(".ta-view .animation-view").remove();
      }
    } else if (stateColors.length == 2) {
      if ($(".ta-view .animation-view").length == 0) {
        Blaze.render(Template.AnimationView, $(".ta-view .view")[0]);
      } else {
        $(".ta-view .animation-view").css("width", "0");
      }
      $(".ta-view .animation-view").css("background", colors[stateColors[1]]);
      var counter = 0;
      var animateView = function() {
        counter++;
        var width = counter.toString() + '%';
        $(".ta-view .animation-view").css("width", width);
        console.log("animating", counter);
        if (counter >= 99) {
          var interval = Session.get("animate-timeout");
          console.log("clearing animation", interval);
          Meteor.clearInterval(interval);
          Session.set("animate-timeout", null);
          $(".ta-view .view").css("background", colors[stateColors[1]]);
          $(".ta-view .animation-view").remove();
        }
      };
      var intTime = WAIT_TIME / 100;
      var animateInterval = Meteor.setInterval(animateView, intTime);
      console.log("starting interval: ", animateInterval);
      Session.set("animate-timeout", animateInterval);
    }
  }
};
