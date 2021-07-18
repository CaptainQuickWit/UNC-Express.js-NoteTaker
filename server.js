
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

//renders the nodes on the left side of the page
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, file));
});

/**
 * this is the post route it will attatch an ID to the note user inputed and will push it to an array of json objects
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

  } catch (err) {
    throw err;
  }

})

/**
 * The delete route it will search for json object to delete by going through the entire array and using splice to cut it out. 
 */
app.delete("/api/notes/:id", (req, res) => {
  console.log("THIS IS THE ID FOR DEL REQ ==>"+req.params.id.toString());
  let notesUpdatedArray = [];
  let idInput = req.params.id;
  let dataStr = fs.readFileSync(file, "utf8");
  let index = 0;

  let data = JSON.parse(dataStr);

    for( var i = 0; i < data.length; i++){ 

        if ( data[i].id == idInput) {          
          data.splice(i, 1); 

        }
    
    }
    fs.writeFileSync(file, JSON.stringify(data));

});
