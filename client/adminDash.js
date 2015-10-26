Template.DataDashboard.helpers({
  session: function() {
    return Classes.find({}, {sort: {dateTime: -1}}); 
  },
});

Template.CreateSession.events({
  'click .create-session': function(evt, elm) {
    console.log("creating data session");
    var desc = $("#session-desc").val();
    var cond = $("#exp-cond").val();
    var cls = new DataSession(desc, cond);
    cls._id = Classes.insert(cls); 
    //Meteor.call("getTinytUrl", [Router.route['TADashboard']]);
    console.log("Created data session: ", cls);
    Meteor.call('getTinyUrl', 
        Router.routes['TADashboard'].url({"sessionId": cls._id}),
        cls._id,
        'url'
    );
    $("#session-desc").val("");
    $("#exp-cond").val("");
  },
});

Template.DataSessionListing.helpers({
  getDate: function() {
    var d = new Date(this.dateTime);
    return d.toDateString();
  },
  getData: function() {
    return {sessionId: this._id};
  },
});
