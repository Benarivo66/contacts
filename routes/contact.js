const express = require('express');

const contactsController = require('../controllers/contact');

const router = express.Router();

router.get('/', contactsController.getAllData);
router.get('/:id', contactsController.getDataById);

// localhost:8080/professional/
module.exports = router;