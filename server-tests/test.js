// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');// Configure chai

chai.use(chaiHttp);
chai.should();describe("Students", () => {
    describe("GET /", () => {
        // Test to find by ingredients
        it("should get recipes", (done) => {
            let ingredientsString = 'apples,flour,sugar';
             chai.request(app)
                 .get(`/spoonacularAPI/findByIngredients?ingredients=${ingredientsString}&number=1`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });        
        // Test to get recipe information
        it("should get recipe information", (done) => {

             chai.request(app)
                 .get('/spoonacularAPI/informationBulk?ids=715538')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        // Test to get invalid endpoint
        it("should return 404", (done) => {
             const id = 5;
             chai.request(app)
                 .get('/spoonacularAPI/invalidEndpoint')
                 .end((err, res) => {
                     res.should.have.status(404);
                     done();
                  });
         });
    });
});