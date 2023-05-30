const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello doctors!')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nvo4nkj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){
    try{
        const appointmentCollection=client.db('doctor_db').collection('appointmentOptions');
        const bookingCollection=client.db('doctor_db').collection('booking');


        app.get('/appointmentOptions', async (req,res)=>{
            const appointmentOptions=await appointmentCollection.find({}).toArray()
            res.send(appointmentOptions)
        })

        // booking api
        app.post('/booking',async (req,res)=>{
          const book=req.body;
          const booked=await bookingCollection.insertOne(book)
        })

    }
    finally{

    }
}
run().catch(console.log())



app.listen(port, () => {
  console.log(`doctor app listening on port ${port}`)
})