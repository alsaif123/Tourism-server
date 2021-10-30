const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require('mongodb');
const port=5000;
app.use(express.json());
app.use(cors());
// root app
app.get("/", (req, res) => {
  res.send("Welcome to server side application");
});
// env file baki ace
const uri = "mongodb+srv://tourDB:tourdb@cluster0.iozoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("Database is ready for tourism application");
 
});



// default route
app.listen(port, () => {
    console.log("Welcome to server side app");
  });
