let jiraUrlInput = document.getElementById("jiraUrl");
let jiraProjectOption = document.getElementById("projectOption");

const externalFiles = {
  listIssues: "jira/issues/listIssues",
};

chrome.storage.local.get(['jiraUrl'], function (result) {
  jiraUrlInput.value = result.jiraUrl;
  window.jiraUrl = result.jiraUrl;
});

jiraUrlInput.onkeydown = (event) => {
  if (event.key === "Enter") {
    window.jiraUtils.getJiraProjects().then((res) => {
      for (let i = 0; i < res.length; i++) {
        jiraProjectOption.options[i + 1] = new Option(res[i].name, res[i].key);
      }
      jiraProjectOption.disabled = false;
    })
  }
};

jiraProjectOption.onchange = (event) => {
  chrome.storage.local.set({ 'jiraUrl': jiraUrlInput.value,}, loadJiraWorkLogGrid(event.currentTarget.options[event.currentTarget.selectedIndex].value));
}

loadJiraWorkLogGrid = (projectKey) => {
  let jiraUrlContainer = document.getElementById("jiraUrlContainer");
  window.projectKey=projectKey;
  document.getElementById("container").removeChild(jiraUrlContainer);
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