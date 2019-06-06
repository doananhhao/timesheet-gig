let jiraUrlInput = document.getElementById("jiraUrl");

chrome.storage.local.get(['jiraUrl'], function(result) {
    jiraUrlInput.value = result.jiraUrl;
    console.log(result.jiraUrl);
})

jiraUrlInput.onkeydown = function(event) {
    if(event.key === "Enter") {
        let input = document.getElementById("jiraUrl");
        chrome.storage.local.set({'jiraUrl': input.value}, function() {
            // Notify that we saved.
            console.log(input.value);
            message('Settings saved');
          });
    }
}