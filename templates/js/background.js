chrome.browserAction.onClicked.addListeneer(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});

        chrome.storage.local.get(['jiraUrl'], function(result) {
            if (result.key != null) {
                jiraUrlInput.value = result.key;
            }
        });
    });e
  });