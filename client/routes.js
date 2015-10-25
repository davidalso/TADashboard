Router.route('/', {
  name: 'Home',
  template: 'DataDashboard',
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

