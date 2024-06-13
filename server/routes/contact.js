const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

router.post('/:companyId', contactController.create);
router.get('/:id', contactController.readOne);
router.put('/:id', contactController.update);
router.delete('/:id', contactController.delete);

module.exports = router;
