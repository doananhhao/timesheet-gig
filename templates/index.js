let jiraUrlInput = document.getElementById("jiraUrl");
let jiraProjectOption = document.getElementById("projectOption");

const externalFiles = {
  listIssues: "jira/issues/listIssues",
};

chrome.storage.local.get(['jiraUrl', 'projectKey'], function (result) {
  jiraUrlInput.value = result.jiraUrl;
  window.jiraUrl = result.jiraUrl;
  window.projectKey = result.projectKey;
  if (window.jiraUrl && window.projectKey) {
    window.jiraUtils.getJiraProjects().then((res) => {
      let selectedIndex = 0;
      for (let i = 0; i < res.length; i++) {
        jiraProjectOption.options[i + 1] = new Option(res[i].name, res[i].key);
        if (res[i].key == window.projectKey) {
          selectedIndex = i + 1;
        }
      }
      jiraProjectOption.disabled = false;
      jiraProjectOption.selectedIndex = selectedIndex;
    });
    loadJiraWorkLogGrid(window.projectKey);
  }
});

jiraUrlInput.onkeydown = (event) => {
  if (event.key === "Enter") {
    chrome.storage.local.set({ 'jiraUrl': jiraUrlInput.value});
    window.jiraUrl = jiraUrlInput.value;
    window.jiraUtils.getJiraProjects().then((res) => {
      let selectedIndex = 0;
      for (let i = 0; i < res.length; i++) {
        jiraProjectOption.options[i + 1] = new Option(res[i].name, res[i].key);

      }
      jiraProjectOption.disabled = false;
    })
  }
};

jiraProjectOption.onchange = (event) => {
  let projectKey = event.currentTarget.options[event.currentTarget.selectedIndex].value;
  chrome.storage.local.set({ 'projectKey': projectKey});
  window.projectKey = projectKey;
  loadJiraWorkLogGrid(projectKey);
}

loadJiraWorkLogGrid = (projectKey) => {
  window.jiraUtils.checkLogin().then((res) => {
		window.userInfo = res;
    $("#includedContent").load(externalFiles.listIssues + ".html");

    $("#issuetableBody").waitUntilExists(
      "#issuetableBody",
      initElement,
      true
    );
  });
}

initElement = () => {
	document.getElementById("user").innerText += ` ${window.userInfo.displayName}`;
  window.jiraUtils.getJiraIssues(window.projectKey).then((res) => {
    res.issues.forEach(issue => {
      createElement(issue);
    })
  });
}