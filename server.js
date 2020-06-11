let express = require("express");

let app = express();

let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Listener

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

// app
// https://tranquil-island-43338.herokuapp.com/