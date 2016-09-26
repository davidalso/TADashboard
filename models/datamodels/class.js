Classes = new Meteor.Collection("classes");
Events = new Meteor.Collection("events");


eventStates = {
          'student': 'student',
          'teacher': 'teacher',
          'student-teacher': 'student-teacher',
          'cadence-student': 'cadence-student',
          'cadence-teacher': 'cadence-teacher',
          'cadence-both': 'cadence-both', // likely unreachable
          'wait-student': 'wait-student',
          'wait-teacher': 'wait-teacher',
          'wait-both': 'wait-both', // likely unreachabl
          'silence': 'silence'
};

eventTypes = {
  1: "student begin talking",
  2: "student end talking",
  3: "teacher begin talking",
  4: "teacher end talking",
  // @Nikolai timing & pausing
  5: "timing begin",
  6: "timing end",
  7: "pause begin",
  8: "pause end",
};

// @tommit Mapping ASCII keys to events of interest
KeyToEventMap = {
	89: 'Question asked', // Key Y
	85: 'Cold call',	// Key U
	73: 'Name used', 	// Key I
	79: 'New student talks' // Key O
}

// @Nikolai observerpause
observerPause = false;

// First color = background color
// Second color = transition color (color of growing rectangle
visualState = {
  1: ['orange'],
  2: ['green'],
  3: ['blue'],
  4: ['orange', 'green'],
  5: ['green', 'blue'],
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
  this.waitTimeout = null;
  this.cadenceTimeout = null;
  this.url = "";
};

Event = function(type, session) {
  this.dateTime = new Date().getTime();
  this.type = type;
  this.sessionId = session._id;
  this.sessionDesc = session.desc;
  this.sessionCond = session.cond;
};
