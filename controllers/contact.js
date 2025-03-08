// const getAllData = async (req, res, next) => {
//   try {
//     const db = mongodb.getDb(); 
//     const collection = db.collection("friends");

//     const result = await collection.find().toArray();
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const { ObjectId } = require("mongodb");

// const getDataById = async (req, res, next) => {
//   try {
//     const db = mongodb.getDb(); 
//     const collection = db.collection("friends");
//     const userId = req.params.id;

//     if (!ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid ID format" });
//     }

//     const result = await collection.findOne({ _id: new ObjectId(userId) });

//     if (!result) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const { findOne, findAll } = require("../models/contact")

const getDataById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await findOne("friends", id);
  
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  };

  const getAllData = async (req, res, next) => {
    try {
      const result = await findAll("friends");
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

module.exports = { getAllData, getDataById };