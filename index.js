const express = require("express");
const colors = require("colors");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const port = 5000;
app.use(express.json());
app.use(cors());
// root app
app.get("/", (req, res) => {
  res.send("Welcome to server side application");
});
// env file baki ace
const uri =
  "mongodb+srv://tourDB:tourdb@cluster0.iozoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// add places
client.connect((err) => {
 
const adminCollection = client.db("tourDB").collection("places");
console.log(`Error : ${err}`.red);
console.log(`MongoDb connected for Job task`.magenta);

// add blog
app.post("/addPlaces", (req, res) => {
  const newPlace= req.body;
  console.log(newPlace);
  adminCollection.insertOne(newPlace).then((result) => {
    console.log(result.insertedCount > 0);
    res.send(result.insertedCount > 0);
  });
});
// getPlaces and show on home
app.get("/getPlaces", (req, res) => {
  adminCollection.find({}).toArray((err, docs) => {
    res.send(docs);
  });
});
});

// default route
app.listen(port, () => {
  console.log("Welcome to server side app");
});
