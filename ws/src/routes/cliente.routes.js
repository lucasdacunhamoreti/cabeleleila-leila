const express = require("express");
const router = express.Router();
const Cliente = require("../models/cliente");

router.get("/", async (_req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json({ error: false, clientes });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const cliente = await new Cliente({
      ...req.body.cliente,
      senha: "12345",
    }).save();

    res.json({ cliente });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post("/filter", async (req, res) => {
  try {
    const clientes = await Cliente.find(req.body.filters);
    res.json({ error: false, clientes });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
