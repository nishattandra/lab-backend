const express = require("express");
const cors = require("cors")
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xoojudr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const labCollection = client.db("studentTable").collection("student");

    app.post('/newdata', async (req, res) => {
        const data = req.body;
        const result = await labCollection.insertOne(data);
        res.send(result);
    });

    app.get('/mydata', async (req, res) => {
        const result = await labCollection.find().toArray();
        res.send(result);
    });

    app.patch("/update/:id", async (req, res) => {
      const id = req.params.id;
      const type = req.body;
      // const query = { _id: new ObjectId(id) };
      // const updateDoc = {
      //   $set: {
      //     type: type,
      //   },
      // };
      console.log(id)
      console.log(type)
      // const result = await labCollection.updateOne(query, updateDoc);
      // res.send(result);
    });
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Tables are loading')
})

app.listen(port, () =>{
    console.log(`Tables are loading on port: ${port}`)
})