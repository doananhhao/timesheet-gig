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

// ------------------------------------------------------
// ------------------------------------------------------

getDaysToDisplay = (worklog) => {
	let currentUserWorkLogs = worklog.worklogs.filter(log => log.author.emailAddress == window.userInfo.emailAddress);
	let display = {
		mon: 0,
		tue: 0,
		wed: 0,
		thu: 0,
		fri: 0
	};
	
	currentUserWorkLogs.forEach(workLog => {
		let currentMonday = getCurrentDateOfWeek(1);
		let currentSatDay = getCurrentDateOfWeek(6);
		let logworkDate = new Date(workLog.started);
		if (logworkDate < currentMonday || logworkDate > currentSatDay) {
      return;
    }
		let dayLog = new Date(workLog.started);
		switch(dayLog.getDay()) {
			case 1: display.mon += workLog.timeSpentSeconds/3600;
				break;
			case 2: display.tue += workLog.timeSpentSeconds/3600;
				break;
			case 3: display.wed += workLog.timeSpentSeconds/3600;
				break;
			case 4: display.thu += workLog.timeSpentSeconds/3600;
				break;
			case 5: display.fri += workLog.timeSpentSeconds/3600;
				break;
			default: break;
		};
	})
	return display;
}

getIssueUrl = (key) => {
  return window.jiraUrl + "/browse/" + key;
};

createElement = (obj) => {
	let displayWorkLog = getDaysToDisplay(obj.fields.worklog);
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
			<td width="95%">
				<a href="${getIssueUrl(obj.key)}">
					${getDisplayIssuseHtml(obj)}
				</a>
			</td>
			<td class="date day">${displayWorkLog.mon != 0 ? displayWorkLog.mon + "h" : ""}</td>
			<td class="day">${displayWorkLog.tue != 0 ? displayWorkLog.tue + "h" : ""}</td>
			<td class="date day">${displayWorkLog.wed != 0 ? displayWorkLog.wed + "h" : ""}</td>
			<td class="day">${displayWorkLog.thu != 0 ? displayWorkLog.thu + "h" : ""}</td>
			<td class="date day">${displayWorkLog.fri != 0 ? displayWorkLog.fri + "h" : ""}</td>
		</tr>`;
};

getCurrentDateOfWeek = (noDay) => {
	if (noDay < 0 && noDay > 6) {
		return;
	}
  d = new Date();
  var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : noDay);
	let result = new Date(d.setDate(diff));
	result.setHours(0, 0, 0);
  return result;
}