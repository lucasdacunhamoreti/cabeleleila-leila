const express = require("express");
const router = express.Router();
const Cliente = require("../models/cliente");

router.post("/", async (req, res) => {
  try {
    const cliente = await new Cliente(req.body).save();
    res.json({ cliente });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
