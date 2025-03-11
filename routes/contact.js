const express = require('express');

const contactsController = require('../controllers/contact');

const router = express.Router();

router.get('/', contactsController.getAllData);
router.get('/:id', contactsController.getDataById);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact)

module.exports = router;