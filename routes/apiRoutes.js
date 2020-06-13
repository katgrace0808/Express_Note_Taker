let fs = require("fs");
let { v4: uuidv4 } = require("uuid");
let db = require("../db/db.json");

module.exports = function (app) {


    app.get("/api/notes", function (req, res) {
        res.send(db);
    });

    app.post("/api/notes", function (req, res) {
        let noteId = uuidv4();
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: noteId
        }
        fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
            let noteData = JSON.parse(jsonString);
            noteData.push(newNote);
            console.log(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 2), err => {
                if (err) throw err;
                res.send(db);
            });
        });
    });

    app.delete("/api/notes/:id", function (req, res) {
        // let noteId = uuidv4();
        // let newNote = {
        //     title: req.body.title,
        //     text: req.body.text,
        //     id: noteId
        // }

        fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
            let noteData = JSON.parse(jsonString);
            fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 2), err => {
                console.log(noteData);
                let id = noteData.id;
                if (noteData.id !== id) {
                    res.send(db);
                } else {
                    deleteNote();
                }
            })
        })
    });

}