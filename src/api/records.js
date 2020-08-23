const express = require('express');
const RecordService = require('../services/RecordService');
const RecordValidator = require('../validators/RecordValidator')

const router = express.Router();

const { validateFilterParams } = RecordValidator

router.post('/filter', validateFilterParams, async (req, res, next) => {
  
  try {
    const records = await RecordService.getRecords(req.body)
    res.json({ code: 0, msg: 'Success', records })
  } catch (error) {
    error.code = 1
    error.msg = 'Business Exception!'
    next(error)
  }

});

module.exports = router;
