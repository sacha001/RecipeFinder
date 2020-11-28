const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require('request');
const cors = require('cors');
const API_KEY = '76432a43e48944deab50e8ad977e9b67'; // ADD spoonacular API KEY HERE

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

app.get('/spoonacularAPI/:endpoint', function (req, res) {
    switch(req.params.endpoint) {
        case 'findByIngredients':
            let ingredients = req.query.ingredients;
            let number = req.query.number === undefined ? '9' : req.query.number;
            request.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number}&apiKey=${API_KEY}`, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    res
                    .status(200)
                    .send(response);
                } else {
                    res
                    .status(response.statusCode)
                    .send('error');
                }
            });
            break;
        case 'informationBulk':
            let ids = req.query.ids;
            request.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${API_KEY}`, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    res
                    .status(200)
                    .send(response);
                } else {
                    res
                    .status(response.statusCode)
                    .send('error');
                }
            });
            break;
        default:
            res
            .status(404)
            .send("Endpoint not supported");
    }    
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// if (API_KEY === '') {
//     console.log('\x1b[41m%s\x1b[0m', 'ERROR: You must add you API key to the server.js file')
//     return;
// }

let server = app.listen(process.env.PORT || 5000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
});

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('app/build'));
    app.get('*', (req, res) => {
    const index = path.join(__dirname, 'build', 'index.html');
      res.sendFile(index);
    });
  }

module.exports = app;