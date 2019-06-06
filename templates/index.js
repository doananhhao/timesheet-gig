// ---------------------------------------------
// ---------------------------------------------
let jiraUrlInput = document.getElementById("jiraUrl");

const externalFiles = {
  listIssues: "jira/issues/listIssues",
};

chrome.storage.local.get(['jiraUrl'], function (result) {
  jiraUrlInput.value = result.jiraUrl;
  window.jiraUrl = result.jiraUrl;
});

jiraUrlInput.onkeydown = (event) => {
  if (event.key === "Enter") {
    chrome.storage.local.set({ 'jiraUrl': jiraUrlInput.value }, loadJiraWorkLogGrid());
  }
};

loadJiraWorkLogGrid = () => {
  let jiraUrlContainer = document.getElementById("jiraUrlContainer");
  document.getElementById("container").removeChild(jiraUrlContainer);
  console.log("check login");
  window.jiraUtils.checkLogin().then(() => {
    $("#includedContent").load(externalFiles.listIssues + ".html");

    $("#issuetableBody").waitUntilExists(
      "#issuetableBody",
      initElement,
      true
    );
  });
}

initElement = () => {
  window.jiraUtils.getJiraIssues().then((res) => {
    res.issues.array.forEach(issue => {
      createElement(issue);
    });
  });
}
// ---------------------------------------------
// ---------------------------------------------

obj = {
  expand:
    "operations,versionedRepresentations,editmeta,changelog,renderedFields",
  id: "59104",
  self: "https://agile.qasymphony.com/rest/api/2/issue/59104",
  key: "MR-8612",
  fields: {
    summary: "Add new API method to retrieve Jira Connection Release Mapping",
    issuetype: {
      self: "https://agile.qasymphony.com/rest/api/2/issuetype/5",
      id: "5",
      description: "The sub-task of the issue",
      iconUrl:
        "https://agile.qasymphony.com/secure/viewavatar?size=xsmall&avatarId=10900&avatarType=issuetype",
      name: "Sub-task",
      subtask: true,
      avatarId: 10900
    },
    parent: {
      id: "58329",
      key: "MR-8515",
      self: "https://agile.qasymphony.com/rest/api/2/issue/58329",
      fields: {
        summary:
          "As a user with Manage Integration Settings permission, I want to retrieve details of all Release mappings of a Jira connection via API",
        status: {
          self: "https://agile.qasymphony.com/rest/api/2/status/11604",
          description: "",
          iconUrl:
            "https://agile.qasymphony.com/images/icons/statuses/generic.png",
          name: "Ready for QA Review",
          id: "11604",
          statusCategory: {
            self: "https://agile.qasymphony.com/rest/api/2/statuscategory/3",
            id: 3,
            key: "done",
            colorName: "green",
            name: "Done"
          }
        },
        priority: {
          self: "https://agile.qasymphony.com/rest/api/2/priority/6",
          iconUrl:
            "https://cdn0.iconfinder.com/data/icons/super-mono-reflection/yellow/arrow-right_yellow.png",
          name: "Medium (P3)",
          id: "6"
        },
        issuetype: {
          self: "https://agile.qasymphony.com/rest/api/2/issuetype/10001",
          id: "10001",
          description:
            "Created by Jira Software - do not edit or delete. Issue type for a user story.",
          iconUrl:
            "https://agile.qasymphony.com/secure/viewavatar?size=xsmall&avatarId=10315&avatarType=issuetype",
          name: "Story",
          subtask: false,
          avatarId: 10315
        }
      }
    },
    worklog: {
      startAt: 0,
      maxResults: 20,
      total: 0,
      worklogs: []
    }
  }
};
