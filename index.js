const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//middlewar ;user  & pass: 
app.use(cors());
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yfrjdbj.mongodb.net/?retryWrites=true&w=majority`;



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

      
        const database = client.db('stayNestDB');
        const collection = database.collection('stayNestCollection');

        app.get('/rooms', async(req, res)=>{
            const result  = await collection.find().toArray();
            res.send(result)
        })

        app.get('/rooms/:id', async(req, res)=>{
            const id = req.params.id;
            console.log('single room id:',id)
            const query = { _id: new ObjectId(id)};
            const result = await collection.findOne(query);
            res.send(result)

        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('stay nest server is running')
})

app.listen(port, () => {
    console.log(`stay nest server is runnig on the port ${port}`)
})