let jiraUrlInput = document.getElementById("jiraUrl");

request = () => {
    let header = {
        "Content-type": "application/json",
        "X-Atlassian-Token": "no-check",
        "Access-Control-Allow-Origin": "*"
        };
    return fetch('https://agile.qasymphony.com/rest/api/2/search?jql=assignee=currentuser()%20and%20project=MR%20and%20updated%20>%3D%20-2w&+order+by+updated&fields=summary,worklog,parent', {
        method: 'GET',
        credentials: 'same-origin',
        headers: header
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err));
};

chrome.storage.local.get(['jiraUrl'], function(result) {
    jiraUrlInput.value = result.jiraUrl;
    console.log(result.jiraUrl);
});

jiraUrlInput.onkeydown = (event) => {
    if(event.key === "Enter") {
        chrome.storage.local.set({'jiraUrl': jiraUrlInput.value}, function() {
            let issues = request();
            console.log(issues);
        });

    }
};

