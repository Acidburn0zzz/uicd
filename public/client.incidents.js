// client-side js
// run by the browser each time your view template is loaded

// This is used to display a list of incidents
var header = document.querySelector('header');
var section = document.querySelector('section');
var requestURL = '/incidents';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var incidents = request.response;
  listIncidents(incidents);
}

function listIncidents(incidents) {
  for(var i = 0; i < incidents.length; i++) {
    var incidentArticle = document.createElement('article');
    var paragraph = document.createElement('p');
    var incidentName = document.createElement('h3');
    var incidentList = document.createElement('ul')
    var incidentCreatedAt = document.createElement('li');
    var incidentUpdatedAt = document.createElement('li');
    var incidentUpdateLink = document.createElement('a')
    var incidentUpdateLinkText = document.createTextNode("Update the Incident");

    incidentName.textContent = incidents[i].name;
    incidentCreatedAt.textContent = 'Opened at: ' + incidents[i].created_at;
    incidentUpdatedAt.textContent = 'Last Updated at: ' + incidents[i].updated_at;
    incidentUpdateLink.appendChild(incidentUpdateLinkText);
    incidentUpdateLink.title = "Update the Incident";
    incidentUpdateLink.href = "/add";

    incidentArticle.appendChild(paragraph);
    incidentArticle.appendChild(incidentName);
    incidentArticle.appendChild(incidentList);
    incidentArticle.appendChild(incidentCreatedAt);
    incidentArticle.appendChild(incidentUpdatedAt);
    incidentArticle.appendChild(incidentUpdateLink);
    section.appendChild(incidentArticle);
  }
}
