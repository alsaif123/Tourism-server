const express = require("express");
 
const cors = require("cors");
 
const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
const port = process.env.PORT || 5000; 

require("dotenv").config();

// mongo client

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// initialized app
const app = express();

//middle
app.use(express.json());
app.use(cors());
//  app
client.connect((err) => {
 
const adminCollection = client.db("tourDB").collection("places");
console.log(`Error : ${err}`);
console.log(`MongoDb connected for Job task`);
app.get("/",(req,res)=>{
  res.send("Tourism Server");
})
// add place
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
  console.log(`Server is running on ${port} Successfully`);
});
