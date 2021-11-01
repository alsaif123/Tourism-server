const express = require("express");
const colors = require("colors");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
 
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000; //||

require("dotenv").config();
// root app
app.get("/", (req, res) => {
  res.send("Welcome to server side application");
});
// env file baki ace
const uri =
 `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.iozoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
  console.log(`Server is running on ${port} Successfully`.orange);
});
