Template.WebsiteList.helpers({
	websites:function(){
		if(Session.equals('sort', 'up')) {
			return Websites.find({}, {sort: {up_votes: -1, createdAt: -1}});
		}
		if(Session.equals('sort', 'diff')) {
			return Websites.find({}, {sort: {votes: -1, up_votes: -1, createdAt: -1}});
		}
		if(Session.equals('sort', 'down')) {
			return Websites.find({}, {sort: {down_votes: -1, createdAt: -1}});
		}
		else {
			return Websites.find({}, {sort: {votes: -1, up_votes: -1, createdAt: -1}});
		}
	},
});
Template.WebsiteList.events({
	"click .js-sort-by-up": function(event, websites){
		 Session.set('sort', 'up');
	},
	'click .js-sort-by-down': function(event, websites){
		Session.set('sort', 'down');
	},
	'click .js-sort-by-diff': function(event, websites){
		Session.set('sort', 'diff');
	}
});
