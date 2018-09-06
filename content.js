console.log("content.js is running");

var value = "some data";

var lastHostName;
var timeSpent = 0;
 chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
       var url = new URL(tabs[0].url);
       lastHostName = url.hostname;
   });

var d = new Date();
var startTime = d.getTime();

chrome.tabs.onUpdated.addListener(function() {
  console.log("Tab updated.");
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = new URL(tabs[0].url);

      // console.log("Last host name" + lastHostName);
      // console.log("Current URL name" + url.hostname);


      if(lastHostName != url.hostname) {
        lastHostName = url.hostname;
        d = new Date();
        timeSpent = d.getTime() - startTime;
        startTime = d.getTime();

        logTime(url.hostname, timeSpent);


      }

      console.log(url);
      console.log("url hostname is "+ url.hostname);
  });
});

chrome.tabs.onActivated.addListener(function() {
  console.log("Tab activated.");
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = new URL(tabs[0].url);
      //console.log(url);
      //console.log("url hostname is "+ url.hostname);
  });
});

function logTime(hostname, time) {
    //check if hostname key exists

   chrome.storage.local.get([hostname], function(result) {
      console.log("Value is "+ result.value);
      console.log("Key is "+ result.key);
      if(result.key == undefined) {
        chrome.storage.local.set({hostname: time}, function() {
            console.log("first time you left "+hostname+" created new key with a new time of "+ time);
        });
      } else {
        chrome.storage.local.set({hostname: (time + result.key)}, function() {
            console.log("Time is updated to "+ (time + result.key) +" for "+ hostname);
        });
      }
   });
}



// //var date = new Date();
// //date.getTime() returns time in miliseconds since 1970
//
// //array
// var log = [];
//
// //add new information
// log.push({
//   url: "",
//   start: "", //date object
//   end: "" //date object
// })
