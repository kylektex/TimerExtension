console.log("My extension (content.js) is running");
//clear storage every time
window.localStorage.clear();


var lastHostName;
var timeSpent = 0;
 chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
       var url = new URL(tabs[0].url);
       lastHostName = url.hostname;
   });

var d = new Date();
var startTime = d.getTime();

chrome.tabs.onUpdated.addListener(function() {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = new URL(tabs[0].url);

      if(lastHostName != url.hostname) {
        logTime(lastHostName, timeSpent);
        lastHostName = url.hostname;
        d = new Date();
        timeSpent = d.getTime() - startTime;
        startTime = d.getTime();
      }
  });
});

chrome.tabs.onActivated.addListener(function() {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    //move to function
      var url = new URL(tabs[0].url);

      if(lastHostName != url.hostname) {
        logTime(lastHostName, timeSpent);
        lastHostName = url.hostname;
        d = new Date();
        timeSpent = d.getTime() - startTime;
        startTime = d.getTime();
      }
  });
});

function updateTime() {
  //will update later
}

function logTime(hostname, time) {
  //check if hostname exists
  var result = window.localStorage.getItem(hostname);
  console.log("called logTime for hostname "+hostname+", result is "+result);
  if(result == null) {
    //hostname doesnt exist
    console.log("making new storage item, current time is " + time);
    window.localStorage.setItem(hostname, time);
  } else {
    //need to upodate item
    console.log("updating storage item, new time is " + (Number(result) + time));
    window.localStorage.setItem(hostname, (Number(result) + time));
  }
}

// chrome.browserAction.onClicked.addListener(function(tab) {
//    chrome.tabs.executeScript(null, {file: "popup.js"});
// });
