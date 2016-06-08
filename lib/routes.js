/// routing

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('WebsiteList', {
    to:"main"
  });
});

Router.route('/website/:_id', function () {
    Session.set('PageId', this.params._id);
    console.log(this.params._id);
      this.render('navbar', {
          to:"navbar"
      });
      this.render('SingleWebsiteItem', {
          to:"main",
          data:function(){
          	   return Websites.findOne({'_id':this.params._id});
           }
      });
});
