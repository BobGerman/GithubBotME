import "https://res.cdn.office.net/teams-js/2.15.0/js/MicrosoftTeams.min.js";

let issuePath = window.location.search;
issuePath = issuePath.replace("?issuePath=", "");
issuePath = issuePath.replaceAll ("*","/");
issuePath = "https://github.com/" + issuePath;

let element = document.getElementById("issueDetails");
element.innerHTML = window.location.href;

window.open(issuePath, "_blank", "width=600,height=800");

await microsoftTeams.app.initialize();
microsoftTeams.tasks.submitTask();
