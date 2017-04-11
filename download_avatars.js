var request = require('request');
var GITHUB_USER = "raz346";
var GITHUB_TOKEN = "b086bcc6763f5fbb966f33c90ec5f24e7a2dd019";
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //  define user-agent 
  var requestOption = {

    headers : {
      "user-agent" : "Ahmed"
    },
    url : requestURL 
  }
  // handle error
  request.get(requestOption,cb)
       .on('error', function (err) {                                    
         console.log(err);
       })
      //  handle the data
      .on('response', function (response) {                         
       })
}
getRepoContributors("jquery", "jquery", function(err, result) {
   // get data as  object ??
  var tempResult = JSON.parse(result.body);
  // iterate over the results
  tempResult.forEach(function (element){
    // print each avatar
    console.log(element["avatar_url"]);
  });
});