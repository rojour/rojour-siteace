Meteor.startup(function () {
  // code to run on server at startup
  if (!Websites.findOne()){
      console.log("No websites yet. Creating starter data.");
        Websites.insert({
          title:"Goldsmiths Computing Department",
          url:"http://www.gold.ac.uk/computing/",
          description:"This is where this course was developed.",
          createdOn:new Date()
      });
       Websites.insert({
          title:"University of London",
          url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
          description:"University of London International Programme.",
          createdOn:new Date()
      });
       Websites.insert({
          title:"Coursera",
          url:"http://www.coursera.org",
          description:"Universal access to the world’s best education.",
          createdOn:new Date()
      });
      Websites.insert({
          title:"Google",
          url:"http://www.google.com",
          description:"Popular search engine.",
          createdOn:new Date()
      });
  }
});


Meteor.publish("application", function(){
    return Websites.find({});
});

Meteor.publish('websitesSearch', function(url) {
var self = this;
var cheerio = Meteor.npmRequire('cheerio'); // Init cheerio to read HTTP information
try {
    var response = HTTP.call('GET', url, {
                        params: {

                        }
            });
    $ = cheerio.load(response.content);
    var title = $('title').text();  // Get title form the website.
    if(!!$('meta[property="og:description"]').attr('content')){
        var desc = $('meta[property="og:description"]').attr('content');
    }
    else {
        var desc = $('meta[name="description"]').attr('content');
    }                 // Description of websites is found in different forms
                     // there may be other options, but this will do for now.


    console.log(desc);
    Websites.insert({
            url: url,
            title: title,
            description: desc,
            createdOn: new Date()
            });         // load the aquired information into our MongoDB.
    self.ready();
    }
    catch(error) {
        console.log(error);
    }
});
