
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

let idInt = 1;
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
    id: idInt
  }; 
  try {

    fs.readFile(file, 'utf8', (err, jsonString) => {
      if (err) {
          console.log("File read failed:", err);
          return;
      } else {
          idInt++;
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
  console.log("THIS IS THE ID FOR DEL REQ ==>"+req.params.id.toString());
  let notesUpdatedArray = [];
  let idInput = req.params.id;
  let dataStr = fs.readFileSync(file, "utf8");
  let index = 0;

  let data = JSON.parse(dataStr);
  console.log("req.params.id ==>"+req.params.id);
  console.log("parsed Data ==>"+data);
  //var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  console.log("data[0].id ==>"+data[0].id);
    for( var i = 0; i < data.length; i++){ 
      console.log("i before==>"+i);
      
        if ( data[i].id == idInput) { 
          
          data.splice(i, 1); 
          console.log("found ele to delete!");
        }
        console.log("i after ==>"+i);
    
    }
    fs.writeFileSync(file, JSON.stringify(data));

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
