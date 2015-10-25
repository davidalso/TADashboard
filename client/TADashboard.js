Template.TADash.onRendered(function() {
  console.log("Done Rendering with id: " + Session.get("sessionId"));
  Tracker.autorun(function() {
    console.log("Changing background to new state");
    var sId = Session.get("sessionId");
    var session = Classes.findOne({_id: sId});
    switch (session.state) {
      case eventStates['student']:
        $(".dashboard").css("background-color", "#5BB1E2");
        break;
      case eventStates['teacher']:
        $(".dashboard").css("background-color", "#5BB1E2");
        break;
      case eventStates['student-teacher']:
        $(".dashboard").css("background-color", "#000");
        break;
      case eventStates['silence']:
        $(".dashboard").css("background-color", "#F26D38");
        break;
    }
  });
});
