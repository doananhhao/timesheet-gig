getDisplayIssuseHtml = (obj) => {
  let html = "";

  if (obj.fields.parent) {
    html = `
			<span style="color:#666">
				<a href="${getIssueUrl(obj.fields.parent.key)}"
					title="${obj.fields.parent.fields.summary}"
					style="color:#666 !important">
					<i>${obj.fields.parent.key}</i>
				</a> /
			</span>
		`;
  }

  return `${html}
		<a href="${getIssueUrl(obj.key)}">
			${obj.fields.summary}
		</a>
	`;
};

getIssueUrl = (key) => {
  return window.jiraUrl + "/browse/" + key;
};

createElement = (obj) => {
  document.getElementById("issuetableBody").innerHTML += `
		<tr>
			<td width="1%">
				<a href="${getIssueUrl(obj.key)}">
					<img height="16"
						src="${obj.fields.issuetype.iconUrl}"
						title="${obj.fields.summary}" width="16">
				</a>
			</td>
			<td width="1%" class="issuekey">
				${obj.key}
			</td>
			<td width="100%">
				<a href="${getIssueUrl(obj.key)}">
					${getDisplayIssuseHtml(obj)}
				</a>
			</td>
			<td>1h</td>
			<td>1h</td>
			<td>1h</td>
			<td>1h</td>
			<td>1h</td>
		</tr>`;
};