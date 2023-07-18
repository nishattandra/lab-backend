const express = require("express");
const cors = require("cors")
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://studentTable:TQAjioK6rqYHHJDC@cluster0.xoojudr.mongodb.net/?retryWrites=true&w=majority`;

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

    app.delete('/deletedata/:id', async (req, res) => {
      const filter = {_id: new ObjectId(req.params.id)};
        const result = await labCollection.deleteOne(filter)
        res.send(result);
    });

    app.put("/updatedata/:id", async (req, res) => {
      const filter = {_id: new ObjectId(req.params.id)};
      const updateDoc = {
        $set: {
          roll: req.body.roll,
          name: req.body.name,
          session: req.body.session,
          current_year: req.body.current_year,
          semester: req.body.semester,
        },
      };

      const result = await labCollection.updateOne(filter, updateDoc);
      res.send(result);
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