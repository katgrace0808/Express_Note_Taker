let express = require("express");
let path = require("path");

let app = express();

let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let index = require("./public/assets/js/index.js")(app);

// HTML Routes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// API Routes

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

// Listener

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});