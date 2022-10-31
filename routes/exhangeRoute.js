const express = require("express");
const router = express.Router();
const exchanger=require('../controllers/exchangeController')

router.post("/", exchanger);

module.exports = router;