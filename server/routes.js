Router.route("/api/sessionData/:sessionId", {
  where: 'server',
  name: 'api.getSessionData',
})
.get(function() {
  //Get all ideas for a requested prompt
  var request = this.request;
  logger.trace(request.url);
  var parsedUrl = request.url.split('/');
  var sessionId = parsedUrl[parsedUrl.length - 1];
  logger.info("Converting to CSV ideas for prompt with ID: " + sessionId);
  var data = Events.find({sessionId: sessionId}).fetch();
  var csv = JSONtoCSV(data, ';');
  logger.trace("Outputting csv data: ", csv);
  var filename = 'session-' + sessionId + '.csv';

  var headers = {
    'Content-Type': 'text/csv',
    'Content-Disposition': "attachment; filename=" + filename
  };

  this.response.writeHead(200, headers);
  return this.response.end(csv);
});

