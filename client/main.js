/////
// accounts config

Accounts.ui.config({
passwordSignupFields: "USERNAME_ONLY"
});

///

Template.body.helpers({username: function() {
		if(Meteor.user()) {
			return Metero.user().username;
		}
		else {
			return "anonymous user";
		}
	}
});
