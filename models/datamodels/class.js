Classes = new Meteor.Collection("classes");
Events = new Meteor.Collection("events");


eventStates = {'student': 'student',
          'teacher': 'teacher',
          'student-teacher': 'student-teacher',
          'silence': 'silence'
};

// First color = background color
// Second color = transition color (color of growing rectangle
visualState = {
  1: ['orange'],
  2: ['orange', 'green'],
  3: ['green'],
  4: ['orange', 'blue'],
  5: ['green', 'blue'],
  6: ['blue']
}

colors = {
  'orange': "#FF6600",
  'green': "#66CC33",
  'blue': "#3366CC"
};

DataSession = function(desc, expCond) {
  this.dateTime = new Date().getTime();
  this.desc = desc;
  this.cond = expCond;
  this.state = eventStates['silence'];
  this.lastState = eventStates['silence'];
  this.url = "";
};

Event = function(type, session) {
  this.dateTime = new Date().getTime();
  this.type = type;
  this.sessionId = session._id;
  this.sessionDesc = session.desc;
  this.sessionCond = session.cond;
};
