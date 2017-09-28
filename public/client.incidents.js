// client-side js
// run by the browser each time your view template is loaded

// This is used to display a list of incidents
$(function() {
  $.get('/incidents', function(incidents) {
    incidents.forEach(function(incident) {
      console.log(incident)
      $('<b></b>').text(incident['name']).appendTo('ul#incidents');
      $('<li></li>').text("Created at: " + incident['created_at']).appendTo('ul#incidents');
      $('<li></li>').text("Last updated at: " + incident['updated_at']).appendTo('ul#incidents');
    });
  });
});
