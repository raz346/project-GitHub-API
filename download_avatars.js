var request = require('request');
var fs = require('fs');
var config = require('./config.js');
var GITHUB_USER = config.GITHUB_USER;
var GITHUB_TOKEN = config.GITHUB_TOKEN;
var repoOwner = process.argv[2];
var repoName = process.argv[3];
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //  define user-agent
  var requestOption = {

    headers: {
      "user-agent": "Ahmed"
    },
    url: requestURL
  };
  // handle error
  request.get(requestOption, cb)
       .on('error', function (err) {
         console.log(err);
       })
      //  handle the data
      .on('response', function (response) {
        return response;
      });
}
getRepoContributors(repoOwner, repoName, function(err, result) {
   // get data as  object ??
  var tempResult = JSON.parse(result.body);
  // iterate over the results
  try {
    tempResult.forEach(function (element){
    // invoke  downloadImageByURL and pass avatar url and loging info as arguments
      downloadImageByURL(element["avatar_url"], element["login"] + ".jpg");
    
    });
  } catch (err) {
    console.log("you must input a user name and a repo name");
  }
});
function downloadImageByURL(url, filePath) {
  console.log('Downloading image...');
  var path = "./avatars";
  if(!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         return response;
       })
       .on('end', function(){})
       .pipe(fs.createWriteStream(path + "/" + filePath));
}