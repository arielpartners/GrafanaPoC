var express = require('express');
var moment = require('moment-timezone');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

moment.tz.setDefault("America/New_York");

//A generic annotation
var annotation = {
    name : "Tesla",
    enable: true,
    datasource: "generic datasource",
    showLine: true
};

//A default annotation
var annotations = [{ annotation: annotation, "title": "Tesla", "time": new Date().getTime(), text: "Tesla - Hadron", tags: "hadron" }];

//Metrics/Targets
var metrics = ['error-report', 'device-report'];

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


/**
 * Respond successfully if this service is available
 *
 */
app.all('/', function(req, res) {
    var random = Math.random();
    res.json({"success" : random});
});


/**
 * Get available annotations
 *
 * For now we just return a default annotation. But we might consider to add an endpoint in order to add annotation
 */

app.all('/annotations', function(req, res) {

    res.json(annotations);
});

/**
 * Get the available targets/metrics
 *
 * For now we just return the value 'dax' but would be actually a good idea to extend our example with a target attribute which reflects the prefix of the document
 *
 *  dax:$ts : { 'target' : 'dax', ... }
 *
 */
app.all('/search', function(req, res){

    res.json(metrics);

});

app.all('/query', jsonParser, function(req, res){
    var reqBody = req.body;
    console.log(req.url);
    console.log(reqBody);

    var result = {};
    result.target = metrics[0];
    result.datapoints = [];

    if (reqBody.targets && reqBody.targets[0].target === 'error-report') {
        res.json([
            {
                "target": "error-report", // The field being queried for
                "datapoints": [
                    [149, moment('2017-03-08T22:00:00.000+00:00').valueOf()],
                    [550, moment('2017-03-08T23:00:00.000+00:00').valueOf()],
                    [643, moment('2017-03-09T00:00:00.000+00:00').valueOf()],
                    [797, moment('2017-03-09T01:00:00.000+00:00').valueOf()],
                    [888, moment('2017-03-09T02:00:00.000+00:00').valueOf()],
                    [1276, moment('2017-03-09T03:00:00.000+00:00').valueOf()],
                    [1576, moment('2017-03-09T04:00:00.000+00:00').valueOf()],
                    [1711, moment('2017-03-09T05:00:00.000+00:00').valueOf()],
                    [1616, moment('2017-03-09T06:00:00.000+00:00').valueOf()],
                    [1019, moment('2017-03-09T07:00:00.000+00:00').valueOf()],
                    [701, moment('2017-03-09T08:00:00.000+00:00').valueOf()],
                    [482, moment('2017-03-09T09:00:00.000+00:00').valueOf()],
                    [450, moment('2017-03-09T10:00:00.000+00:00').valueOf()],
                    [418, moment('2017-03-09T11:00:00.000+00:00').valueOf()],
                    [484, moment('2017-03-09T12:00:00.000+00:00').valueOf()],
                    [727, moment('2017-03-09T13:00:00.000+00:00').valueOf()],
                    [998, moment('2017-03-09T14:00:00.000+00:00').valueOf()],
                    [1010, moment('2017-03-09T15:00:00.000+00:00').valueOf()],
                    [668, moment('2017-03-09T16:00:00.000+00:00').valueOf()],
                    [388, moment('2017-03-09T17:00:00.000+00:00').valueOf()],
                    [498, moment('2017-03-09T18:00:00.000+00:00').valueOf()],
                    [1183, moment('2017-03-09T19:00:00.000+00:00').valueOf()],
                    [1385, moment('2017-03-09T20:00:00.000+00:00').valueOf()],
                    [725, moment('2017-03-09T21:00:00.000+00:00').valueOf()],
                    [488, moment('2017-03-09T22:00:00.000+00:00').valueOf()]
                ]
            }
        ]);
    } else {
        res.json([
            {
                "target": "android", // The field being queried for
                "datapoints": [
                    [1532, 'android']
                ]
            },
            {
                "target": "androidtablet", // The field being queried for
                "datapoints": [
                    [579, 'androidtablet']
                ]
            },
            {
                "target": "androidtv", // The field being queried for
                "datapoints": [
                    [214, 'androidtv']
                ]
            },
            {
                "target": "appletv", // The field being queried for
                "datapoints": [
                    [2273, 'appletv']
                ]
            },
            {
                "target": "desktop", // The field being queried for
                "datapoints": [
                    [6052, 'desktop']
                ]
            },
            {
                "target": "firetv", // The field being queried for
                "datapoints": [
                    [4238, 'firetv']
                ]
            },
            {
                "target": "ios", // The field being queried for
                "datapoints": [
                    [1961, 'ios']
                ]
            },
            {
                "target": "ipad", // The field being queried for
                "datapoints": [
                    [1163, 'ipad']
                ]
            },
            {
                "target": "ps4", // The field being queried for
                "datapoints": [
                    [605, 'ps4']
                ]
            },
            {
                "target": "xb1", // The field being queried for
                "datapoints": [
                    [2213, 'xb1']
                ]
            }
        ]);
    }

});


app.listen(9000, function () {
    console.log('Example app listening on port 9000!')
});