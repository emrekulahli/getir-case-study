const express = require('express');
const records = require('./records');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Getir Case Study Rest API - v1')
});

router.use('/records', records);

module.exports = router;
