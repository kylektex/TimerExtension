console.log("content.js is running");

var value = "some data";

//storage stuff
chrome.storage.sync.set({key: value}, function() {
    console.log('Value is set to ' + value);
});
chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
});

chrome.tabs.onUpdated.addListener(function() {
  console.log("Tab updated.");
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = new URL(tabs[0].url);
      console.log(url);
      console.log("url hostname is "+ url.hostname);
  });
});

chrome.tabs.onActivated.addListener(function() {
  console.log("Tab activated.");
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = new URL(tabs[0].url);
      console.log(url);
      console.log("url hostname is "+ url.hostname);
  });
});



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
