var userProfileProxy = function(http){
  this.getUserProfileData = function(){
     return {"country":"in","city":"Hyderabad","topics":[{"urlkey":"javascript","name":"JavaScript","id":7029},{"urlkey":"web-development","name":"Web Development","id":15582},{"urlkey":"webdesign","name":"Web Design","id":659},{"urlkey":"newtech","name":"New Technology","id":9696},{"urlkey":"mobile-technology","name":"Mobile Technology","id":16216},{"urlkey":"mobile-development","name":"Mobile Development","id":21441},{"urlkey":"html5","name":"HTML5","id":78565},{"urlkey":"cloud-computing","name":"Cloud Computing","id":15167},{"urlkey":"programming","name":"Programming","id":17627},{"urlkey":"startup-businesses","name":"Startup Businesses","id":21681},{"urlkey":"opensource","name":"Open Source","id":563},{"urlkey":"softwaredev","name":"Software Development","id":3833},{"urlkey":"lean-startup","name":"Lean Startup","id":38660},{"urlkey":"meteor","name":"Meteor","id":921432},{"urlkey":"internet-startups","name":"Internet Startups","id":128595},{"urlkey":"entrepreneurship","name":"Entrepreneurship","id":19882}],"joined":1378366274000,"link":"http:\/\/www.meetup.com\/members\/109863862","photo":{"highres_link":"http:\/\/photos1.meetupstatic.com\/photos\/member\/5\/2\/2\/8\/highres_144381032.jpeg","photo_id":144381032,"photo_link":"http:\/\/photos3.meetupstatic.com\/photos\/member\/5\/2\/2\/8\/member_144381032.jpeg","thumb_link":"http:\/\/photos1.meetupstatic.com\/photos\/member\/5\/2\/2\/8\/thumb_144381032.jpeg"},"lon":78.4800033569336,"other_services":{"twitter":{"identifier":"@kvkirthy"}},"name":"V Keerti Kotaru","visited":1432134774000,"self":{"common":{}},"id":109863862,"lang":"en_US","lat":17.399999618530273,"status":"active"};
  } ;
};

userProfileProxy.$inject = ["$http"];