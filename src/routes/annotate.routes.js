const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const annotateController = require('../controllers/annotate.controller');

router.get('/', auth, annotateController.getData);

router.post('/', auth, annotateController.updateData);

router.delete('/', auth, annotateController.deleteData);

module.exports = router;