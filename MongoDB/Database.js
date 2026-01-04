//   const url = "mongodb+srv://armycoding02:Bittukumar12345@codingadda.htca7.mongodb.net/";
//   cluster-> database->collection->documment->Field in the from of key and value 
// Cluster means multiple colection of servers node

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
 const url = "mongodb+srv://armycoding02:Bittukumar12345%40@codingadda.htca7.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = 'myapp';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  // the following code examples can be pasted here...


  const findResult = await collection.find({}).toArray();// to.Array jitna bhi collction usko pura lake aayega but cursor sirf jiko chahiye usko hi leke aayega 

  console.log('Found documents =>', findResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());