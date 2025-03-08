const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const findOne = async (collectionName, id) => {
  const db = mongodb.getDb();
  const collection = db.collection(collectionName);

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  return await collection.findOne({ _id: new ObjectId(id) });
};
const findAll = async (collectionName) => {
    const db = mongodb.getDb();
    const collection = db.collection(collectionName);
    return await collection.find().toArray();
  };

module.exports = { findOne, findAll }