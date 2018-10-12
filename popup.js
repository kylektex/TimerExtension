//check which tab is active
console.log("popup.js running");
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
  //get current url
  var url = new URL(tabs[0].url);
  console.log(url.hostname);
  //document.getElementById('currentUrl').text = url.hostname;
});

function hello() {
  console.log("hello");
}

document.getElementById('clickme').addEventListener('click', hello);
