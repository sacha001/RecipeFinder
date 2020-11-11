const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require('request');
const cors = require('cors')

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/api', function (req, res) {
    request.get('http://www.recipepuppy.com/api/?i=onions,garlic', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(response);
        } else {
            res.send('error');
        }
    });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let server = app.listen(process.env.PORT || 8080, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
});