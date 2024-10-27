const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')


dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Fortify';
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect();

// Get all the Passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save a Password
app.post('/', async (req, res) => {
  const Password = req.body
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.insertOne(Password);
  res.send({success : true, result: findResult})
})

// Delete a Password by id
app.delete('/', async (req, res) => {
  const { id } = req.body; // Assuming 'id' is sent in the body for the password to delete

  if (!id) {
      return res.status(400).send({ success: false, message: 'ID is required to delete a password.' });
  }

  try {
      const db = client.db(dbName);
      const collection = db.collection('Passwords');

      // Perform the delete operation
      const result = await collection.deleteOne({ id }); // Only filter by ID

      if (result.deletedCount === 0) {
          return res.status(404).send({ success: false, message: 'Password not found.' });
      }

      res.send({ success: true, message: 'Password deleted successfully.' });
  } catch (error) {
      console.error('Error deleting password:', error);
      res.status(500).send({ success: false, message: 'Internal server error.' });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})