Template.TADash.onRendered(function() {
  console.log("Done Rendering with id: " + Session.get("sessionId"));
  Tracker.autorun(updateTADash);
  // Tracker.autorun(function() {
    // console.log("Changing background to new state");
    // var sId = Session.get("sessionId");
    // var session = Classes.findOne({_id: sId});
    // switch (session.state) {
      // case eventStates['student']:
        // $(".dashboard").css("background-color", "#5BB1E2");
        // break;
      // case eventStates['teacher']:
        // $(".dashboard").css("background-color", "#5BB1E2");
        // break;
      // case eventStates['student-teacher']:
        // $(".dashboard").css("background-color", "#000");
        // break;
      // case eventStates['silence']:
        // $(".dashboard").css("background-color", "#F26D38");
        // break;
    // }
  // });
});

var updateTADash = function() {
  //console.log("******************************************");
  var sessionId = Session.get("sessionId");
  var session = Classes.findOne({_id: sessionId});
  var stateColors = getStateColor(session['cond'], session['state'], session['lastState']);
  //console.log("updating TA Dash state", stateColors);
  if (stateColors.length == 1) {
    $(".dashboard").css("background", colors[stateColors[0]]);
  } else if (stateColors.length == 2) {
    Blaze.render(Template.AnimationView, $(".dashboard")[0]);
    $(".dashboard .animation-view").css("background", colors[stateColors[1]]);
    var counter = 0;
    var animateView = function() {
      counter++;
      var width = counter.toString() + '%';
      $(".dashboard .animation-view").css("width", width);
      //console.log("animating", interval, counter);
      if (counter >= 99) {
        Meteor.clearInterval(interval);
        $(".dashboard").css("background", colors[stateColors[1]]);
        $(".dashboard .animation-view").remove();
      }
    };
    var interval = Meteor.setInterval(animateView, 30);
    
  }
};
