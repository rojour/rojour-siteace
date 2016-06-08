Websites = new Mongo.Collection("websites");

Websites.allow({
	// we need to be able to update websites for comments.
	update:function(userId, doc){
		console.log("testing security on webpage update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (comment) the websites.
			return false;
		}
	},

	insert:function(userId, doc){
		console.log("testing security on webpage insert");
		if (Meteor.user()){// they are logged in
				return true;
			}
		else {// user not logged in
			return false;
		}
	},
	remove:function(userId, doc){
		return true;
	}
});

Meteor.methods({
    removeComment: function(comentario, PageId){
		if(Meteor.user()) {
			var me = Meteor.user().username;
			if(!(me == comentario.commentBy)) {
				throw new Meteor.Error("Comment does not belong to you.", 'You can not delete.');
			}
			Websites.update({_id:PageId}, {$pull:  {comments:{_id: comentario._id}}}); //remove the comment.
		}
		else {
			throw new Meteor.Error("You need to be logged in to make changes.");
		}
    },
});
