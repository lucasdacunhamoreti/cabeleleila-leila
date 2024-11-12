const express = require("express");
const router = express.Router();
const Servico = require("../models/servico");

router.post("/", async (_req, res) => {
  try {
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const servicos = await Servico.find({ status: "A" }).select("_id titulo");
    res.json({
      servicos: servicos.map((s) => ({ label: s.titulo, value: s._id })),
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
