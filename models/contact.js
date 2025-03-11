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
const insertOne = async (newContact) => {
  const db = mongodb.getDb();
  const result = await db.collection("friends").insertOne(newContact);
  return await result;
};
const updateOne = async (id, updatedContact, collectionName) => {
  const db = mongodb.getDb();
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: updatedContact });
  return result;
};
const deleteOne = async (id, collectionName) => {
  const db = mongodb.getDb();
  const result = await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });
    return result;
};

module.exports = { findOne, findAll, insertOne, updateOne, deleteOne };
