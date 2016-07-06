var Service = require('./service')

Service.getUser().then(function(user) {
  var view = require('./roundStart');
    view.init({user: user})
    view.open();
})

