Template.WebsiteItem.events({
	"click .js-upvote":function(event){

		var website_id = this._id;
		var up_votes = this.up_votes;
		var upVoters = Websites.findOne({_id:this._id}, {votesUp: {$in:Meteor.user()._id}}).votesUp;
		var downVoters = Websites.findOne({_id:this._id}, {votesDown: {$in:Meteor.user()._id}}).votesDown;

		if(!_.contains(upVoters, Meteor.user()._id)){
			Bert.alert('thanks for your vote', 'success', 'growl-top-right');
			Websites.update({_id:this._id}, {$addToSet: {votesUp: Meteor.user()._id}});
		}
		else {
			Bert.alert('You already up-voted for this site - you can only vote once up and once down', 'danger', 'growl-top-right');
		}

		var upVoters = Websites.findOne({_id:this._id}, {votesUp: {$in:Meteor.user()._id}}).votesUp;
		if(upVoters){
			up_votes = upVoters.length;
		}
		else {
			up_votes = 0;
		}
		if(downVoters){
			down_votes = downVoters.length;
		}
		else {
			down_votes = 0;
		}
		 var votes = up_votes - down_votes;
		Websites.update({_id:website_id}, {$set: {votes: votes, up_votes: up_votes}});
		return false;// prevent the button from reloading the page
	},
	"click .js-downvote":function(event){

		var website_id = this._id;
		var votes = this.votes;
		var down_votes = this.down_votes;
		var downVoters = Websites.findOne({_id:this._id}, {votesDown: {$in:Meteor.user()._id}}).votesDown;
		var upVoters = Websites.findOne({_id:this._id}, {votesUp: {$in:Meteor.user()._id}}).votesUp;

		if(!_.contains(downVoters, Meteor.user()._id)){
			Bert.alert('thanks for your vote', 'success', 'growl-top-right');
			Websites.update({_id:this._id}, {$addToSet: {votesDown: Meteor.user()._id}});
			votes = votes - 1
		}
		else {
			Bert.alert('You already down-voted for this site - you can only vote once up and once down', 'danger', 'growl-top-right');
		}

		var downVoters = Websites.findOne({_id:this._id}, {votesDown: {$in:Meteor.user()._id}}).votesDown;
		if(upVoters){
			up_votes = upVoters.length;
		}
		else {
			up_votes = 0;
		}
		if(downVoters){
			down_votes = downVoters.length;
		}
		else {
			down_votes = 0;
		}
		 var votes = up_votes - down_votes;

		Websites.update({_id:website_id}, {$set: {votes: votes, down_votes: down_votes}});
		return false;// prevent the button from reloading the page
	},
	'click js-gotoComments': function(event){
		Session.set('PageId', this._id);
		console.log(this);
	}
});
