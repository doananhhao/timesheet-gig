getDisplayIssuseHtml = (obj) => {
  let html = "";

  if (obj.parent) {
    html = `
			<span style="color:#666">
				<a href="${getIssueUrl(obj.parent.key)}"
					title="${obj.parent.fields.summary}"
					style="color:#666 !important">
					<s>${obj.parent.key}</s>
				</a> /
			</span>
		`;
  }

  return `${html}
		<a href="https://agile.qasymphony.com/browse/MR-5449">
			Planning and Meeting
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
				${getDisplayIssuseHtml(obj)}
			</td>
			<td width="100%">
				<a href="${getIssueUrl(obj.key)}">
					${obj.fields.summary}
				</a>
			</td>
			<td>1h</td>
			<td>1h</td>
			<td>1h</td>
			<td>1h</td>
			<td>1h</td>
		</tr>`;
};