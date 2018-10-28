// //check which tab is active
// console.log("popup.js running");
// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//   //get current url
//   var url = new URL(tabs[0].url);
//   console.log(url.hostname);
//   //document.getElementById('currentUrl').text = url.hostname;
// });
//
// function hello() {
//   console.log("ran function 'hello'");
//   document.getElementById("currentUrl").text = "new text, hoe";
// }
// document.addEventListener('DOMContentLoaded', function() {
//     var link = document.getElementById('link');
//     // onClick's logic below:
//     link.addEventListener('click', function() {
//         hello();
//     });
// });
var a=0;
function count() {
    a++;
    document.getElementById('demo').textContent = a;
}
document.getElementById('do-count').onclick = count;

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  document.getElementById('demo').textContent = response.answer;
});
