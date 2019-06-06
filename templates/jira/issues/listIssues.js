parseDateCustom = function(date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function(num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? "0" : "") + norm;
    };
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
		pad(date.getSeconds()) +
		".000" +
    dif +
    pad(tzo / 60) +
    pad(tzo % 60)
  );
};

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
		let currentMonday = getCurrentDateOfWeek(1).setHours(0, 0, 0);
		let currentSatDay = getCurrentDateOfWeek(6).setHours(0, 0, 0);
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
      <td class="date day">
        ${getDisplayLogedDayHtml(displayWorkLog.mon, obj.key, 1)}
      </td>
      <td class="day">
        ${getDisplayLogedDayHtml(displayWorkLog.tue, obj.key, 2)}
      </td>
      <td class="date day">
        ${getDisplayLogedDayHtml(displayWorkLog.wed, obj.key, 3)}
      </td>
      <td class="day">
        ${getDisplayLogedDayHtml(displayWorkLog.thu, obj.key, 4)}
      </td>
      <td class="date day">
        ${getDisplayLogedDayHtml(displayWorkLog.fri, obj.key, 5)}
      </td>
    </tr>`;
    
  document.querySelectorAll("#issuetableBody input").forEach(element => {
    element.addEventListener("keyup", function(event) {
			if (event.key == "Enter") {
        let oldHoursNumber = event.target.getAttribute("data-hours");
				let key = event.target.getAttribute("data-key");
				let hours = event.target.value;
				let second = hours.substring(0, hours.length - 1) * 3600;
				let date = parseDateCustom(new Date(event.target.getAttribute("data-date")));
        window.jiraUtils.pushJiraWorklog(key, date, second);
        let newHours = parseFloat(hours.substring(0, hours.length - 1)) + parseFloat(oldHoursNumber);
        event.target.setAttribute("data-hours", newHours);
        event.target.value = `${newHours}h`;
			}
		});
  });
};

getDisplayLogedDayHtml = (hours, key, day) => {
  return `<input type="text" data-key="${key}" data-hours="${hours}" data-date="${getCurrentDateOfWeek(day)}" value="${
    hours != 0 ? hours + "h" : ""
  }" title="Add more hours">`;
};

getCurrentDateOfWeek = (noDay) => {
	if (noDay < 0 && noDay > 6) {
		return;
	}
  d = new Date();
  var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : noDay);
  return new Date(d.setDate(diff));
}
