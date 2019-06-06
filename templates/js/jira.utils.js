!function (window) {
  console.log("init util");
  window.jiraUtils = {
    getJiraIssues: () => {
      let header = {
        "Content-type": "application/json",
        "X-Atlassian-Token": "no-check",
        "Access-Control-Allow-Origin": "*"
      };
      return fetch(window.jiraUrl + '/rest/api/2/search?jql=assignee=currentuser()%20and%20project=AA%20and%20updated%20>%3D%20-1w&+order+by+updated&fields=summary,worklog,parent,issuetype', {
        method: 'GET',
        credentials: 'same-origin',
        headers: header
      }).then(res => {
        return res.json();
      }).catch(err => console.log(err));
    },

    checkLogin : () => {
      let header = {
        "Content-type": "application/json",
        "X-Atlassian-Token": "no-check",
        "Access-Control-Allow-Origin": "*"
      };
      return fetch(window.jiraUrl + '/rest/api/2/myself', {
        method: 'GET',
        credentials: 'same-origin',
        headers: header
      }).then(res => {
        return res.json();
      });
    },

    pushJiraWorklog: (issueKey, started, timeSpentSeconds) => {
      let header = {
        "Content-type": "application/json",
        "X-Atlassian-Token": "no-check",
        "Access-Control-Allow-Origin": "*"
      };
      return fetch(window.jiraUrl + '/rest/api/2/issue/' + issueKey +'/worklog', {
        method: 'POST',
        credentials: 'same-origin',
        headers: header,
        body: JSON.stringify({"started": started, "timeSpentSeconds": timeSpentSeconds})
      }).then(res => {
        return res.json();
      });
    }
  }
}(window);