const { ObjectId } = require("mongodb");
const { findOne, findAll, insertOne, updateOne, deleteOne } = require("../models/contact")

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

  const createContact = async (req, res) => {
    try {
      const { firstName, lastName, email, favoriteColor, birthday } = req.body;
      if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const newContact = {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday 
      };
      const result = await insertOne(newContact);
  
      res.status(201).json({ message: "Contact created", result });
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid contact ID" });
        }

        if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
            return res.status(400).json({ error: "At least one field is required for update" });
        }

        const updatedContact = {};

        if (firstName) updatedContact.firstName = firstName;
        if (lastName) updatedContact.lastName = lastName;
        if (email) updatedContact.email = email;
        if (favoriteColor) updatedContact.favoriteColor = favoriteColor;
        if (birthday) updatedContact.birthday = birthday; 

        const result = await updateOne(id, updatedContact, "friends");

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json({ message: "Contact updated successfully", result });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteContact = async (req, res) => {
  try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid contact ID" });
      }

      const result = await deleteOne(id, "friends");

      if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Contact not found" });
      }

      res.status(200).json({ message: "Contact deleted successfully", result });
  } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};
    
module.exports = { getAllData, getDataById, createContact, updateContact, deleteContact };