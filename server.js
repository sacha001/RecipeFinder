const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require('request');
const cors = require('cors');
const API_KEY = ''; // ADD spoonacular API KEY HERE

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/recipepuppyAPI', function (req, res) {
    request.get(`http://www.recipepuppy.com/api/?i=${req.query.ingredients}`, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(response);
        } else {
            res.send('error');
        }
    });
});

app.get('/findByIngredients', function (req, res) {
    let ingredients = req.query.ingredients;
    request.get(`http://www.recipepuppy.com/api/?ingredients=${ingredients}&number=10`, function(err, response, body) {
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

// if (API_KEY === '') {
//     console.log('\x1b[41m%s\x1b[0m', 'ERROR: You must add you API key to the server.js file')
//     return;
// }

let server = app.listen(process.env.PORT || 8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
});