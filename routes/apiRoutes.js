let fs = require("fs");
let { v4: uuidv4 } = require("uuid");
let db = require("../db/db.json");

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
            let noteData = JSON.parse(jsonString);
            res.send(noteData);
        });
    })

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
            fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 2), err => {
                if (err) throw err;
                res.send(noteData);
            });
        });
    });

    app.delete("/api/notes/:id", function (req, res) {
        let noteId = req.params.id;
        fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
            let noteData = JSON.parse(jsonString);
            let updatedNoteData = noteData.filter(note => note.id != noteId);
            fs.writeFile("./db/db.json", JSON.stringify(updatedNoteData, null, 2), err => {
                if (err) throw err;
                res.send(updatedNoteData);
            })
        })
    });

}