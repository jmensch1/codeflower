
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  // when we receive the request-repo msg from the frame script,
  // request the repo from the button script and return it to the frame
  if (request.type === 'request-repo') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'get-repo'}, function(response) {
        console.log('request-repo response:', response);
        sendResponse(response);
      });
    });
    return true;
  }

  return false;
});
