const http = require('http');
const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URL || 'mongodb://admin:secretpassword123@mongo-service:27017';
const dbName = 'testdb';
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('visits');
    await collection.insertOne({ timestamp: new Date() });
    const count = await collection.countDocuments();
    await client.close();
    res.statusCode = 200;
    res.end(`<h1>Day 6: Mahi and PCR!</h1><p>Total database visits: <b>${count}</b></p><p>Fresh deployment success!</p>`);
  } catch (err) {
    res.statusCode = 500;
    res.end(`<h1>Database Connection Error</h1><p>${err.message}</p>`);
  }
});
server.listen(3000, () => console.log('Running on port 3000'));
