/**
 * Created by david on 28/6/15.
 */
'use strict';

//import the built in http module
var http            = require('http');
var url             = require('url');
var categoryService = require('./services/categoryService');

var host = 'localhost';
var port = '3000';

//var endpoints = require('./endpoints.json');
var endpoints = {
    "/add":       categoryService.add,
    "/printTree": categoryService.getTree
};

function respond(response, status, message, body) {
    var responseObj = {
        "header": {
            "statusCode":    status,
            "statusReason":  http.STATUS_CODES[status],
            "statusMessage": message
        },
        "body":   body || {}
    };
    response.writeHead(status, {'Content-type': 'application/json'});
    response.end(JSON.stringify(responseObj));
}


// create a web server
var server = http.createServer(function (request, response) {

    function handleResponse(err, res) {
        if (err) {
            respond(response, 500, err.message);
        } else {
            respond(response, 200, '', res);
        }
    }

    // extract path and query string
    var inputUrl = url.parse(request.url, true);
    var pathname = inputUrl.pathname;
    var query    = inputUrl.query;

    // log the request url
    console.log('received request: ' + request.url);

    //basic routing
    if (endpoints[pathname]) {
        endpoints[pathname].call(this, query, handleResponse)
    } else {
        respond(response, 404, 'Looks like this page is not available... ');
    }

});

//have the server listen to a given port
server.listen(port, host, function () {
    console.log('server is listening on ', host, ' | ', port);
});


