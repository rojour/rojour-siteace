Template.WebsiteForm.events({
	"click .js-toggle-WebsiteForm":function(event){
		$("#WebsiteForm").toggle('slow');
	},
	"submit .js-save-WebsiteForm":function(event){
		event.preventDefault();
		// here is an example of how to get the url out of the form:
		var url = event.target.url.value;
		console.log("The url they entered is: "+url);
		//  put your website saving code in here!
		if(Meteor.user()) {
			if(url){
				Session.set("url", url);
			}
		}
			event.target.url.value='';
			$("#WebsiteForm").toggle('slow');
		return false;// stop the form submit from reloading the page
	},
});

Session.setDefault("searching", false);


Tracker.autorun(function() {
  if (Session.get('url')) {
	var searchHandle = Meteor.subscribe('websitesSearch', Session.get('url'));
	Session.set('searching', ! searchHandle.ready());
  }
});
