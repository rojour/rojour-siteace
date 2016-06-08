Template.CommentForm.events({
	"click .js-toggle-CommentForm":function(event){
		$("#CommentForm").toggle('slow');
	},
	"submit .js-save-CommentForm": function(event) {
		var comment = event.target.comment.value;
		if(Meteor.user()) {
			Websites.update({_id: this._id},{
					$push:{
						comments:  {
					$each: [{							// appends the new comment to the array of comments
							comment:comment,
							commentBy:Meteor.user().username,
							commentAt: new Date(),
							_id:Random.id()
						}],
						$sort: {commentAt: -1} //sorted so it shows the most recent comments at the top
					}
				}
			});
		}
		event.targer.comment.value = '';
		$("#CommentForm").toggle('slow');
		return false;
	}
});
