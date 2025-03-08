const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

const connectDB = async () => {
  try {
    await client.connect();
    dbConnection = client.db("contacts"); 
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};
connectDB();

const getDb = () => {
  if (!dbConnection) {
    throw new Error("Database connection is not established yet.");
  }
  return dbConnection;
};

module.exports = { getDb };

