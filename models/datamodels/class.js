Classes = new Meteor.Collection("classes");
Events = new Meteor.Collection("events");


eventStates = {'student': 'student',
          'teacher': 'teacher',
          'student-teacher': 'student-teacher',
          'silence': 'silence'
};

DataSession = function(desc, expCond) {
  this.dateTime = new Date().getTime();
  this.desc = desc;
  this.cond = expCond;
  this.state = eventStates['silence'];
  this.url = "";
};

Event = function(type, session) {
  this.dateTime = new Date().getTime();
  this.type = type;
  this.sessionId = session._id;
  this.sessionDesc = session.desc;
  this.sessionCond = session.cond;
};
