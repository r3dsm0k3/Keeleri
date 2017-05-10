var expect  = require("chai").expect;
var request = require("request");


describe("Keeleri API tests", function() {

  describe("Keeleri listing index", function() {
    var url = "http://localhost:7337/";
    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
