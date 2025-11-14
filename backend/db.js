const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://gamerthiru05_db_user:Kz2NhNFqQEhkZATd@pro-doczz-cluster.c61o2lt.mongodb.net/?appName=Pro-Doczz-Cluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = null;

async function connectDB() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    
    // Get the database instance
    db = client.db("pro-doczz");
    
    console.log("✅ Successfully connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}

async function closeDB() {
  try {
    await client.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
}

module.exports = {
  connectDB,
  getDB,
  closeDB,
  client
};

