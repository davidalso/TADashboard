Router.route('/', {
  name: 'Home',
  template: 'DataDashboard',
});

Router.route('/ta-dash/:sessionId', {
  name: 'TADashboard',
  template: 'TADash',
  onBeforeAction: function() {
    Session.set("sessionId", this.params.sessionId);
    this.next();
  },
});

Router.route('/observer-dash/:sessionId', {
  name: 'ObserverDashboard',
  template: 'ObsDash',
  onBeforeAction: function() {
    Session.set("sessionId", this.params.sessionId);
    this.next();
  },
});

Router.configure({
	layoutTemplate: 'AdminDashboard',
  action: function(){
    if(this.ready())
      this.render();
    else
      this.render('loading');
  }
});

