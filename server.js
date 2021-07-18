
// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const file = "./db/db.json";


//Uses Express and sets up the port
const app = express();
var PORT = process.env.PORT || 3000;
//app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// Starts the server to begin listening


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

app.get('/',(req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/home',(req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

/*
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
*/
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, file));
});

/*
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

*/
app.post("/api/notes", (req, res) => {
  
  var jsonData;
  var notesObj = {
    title: req.body.title,
    text: req.body.text,

  }; 
  try {

    fs.readFile(file, 'utf8', (err, jsonString) => {
      if (err) {
          console.log("File read failed:", err);
          return;
      } else {
          console.log('File data1:', jsonString);
          jsonData =  JSON.parse(jsonString);
          jsonData.push(notesObj);

          console.log("jsonData1==>"+jsonData);
          fs.writeFileSync(file, JSON.stringify(jsonData));
      }});

     //console.log("jsonData2==>"+jsonData);
     //fs.writeFileSync(file, JSON.stringify(notesObj));

  } catch (err) {
    throw err;
  }


  

})



/*
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

*/
app.delete("/api/notes/:id", (req, res) => {

});

/*
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

*/
