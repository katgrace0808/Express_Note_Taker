let index = require("./public/assets/js/index.js");

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(index);
    });
    
    app.post("/api/notes", function(req, res) {
        index.push(req);
        res.json(true);
    });
    
    app.delete("/api/notes/:id", function(req, res) {
        console.log(index);
    });
    
}