const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company');

router.post('/', companyController.create);
router.get('/', companyController.readAll);
router.get('/:id', companyController.readOne);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.delete);

module.exports = router;
