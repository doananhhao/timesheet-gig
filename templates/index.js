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
  window.jiraUtils.getJiraIssues().then((res) => {
    res.issues.forEach(issue => {
      createElement(issue);
    });
  });
}
// ---------------------------------------------
// ---------------------------------------------