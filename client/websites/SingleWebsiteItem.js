Meteor.subscribe("application");

Template.SingleWebsiteItem.onCreated(function(){
    this.editMode = new ReactiveVar(false);
    })


Template.SingleWebsiteItem.events({
    "click .glyphicon-trash": function(){
            Meteor.call("removeComment", this, Session.get('PageId'), (err, res) => {
                if(err) {
                    message = String(err);
                    Bert.alert(message, 'danger', 'growl-top-right');
                }else {
                    // success
                }
                });
    },
});
