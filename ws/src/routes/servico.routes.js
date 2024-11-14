const express = require("express");
const router = express.Router();
const Servico = require("../models/servico");

router.post("/", async (req, res) => {
  try {
    const servico = await new Servico(req.body).save();
    res.json({ servico });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { _id, __v, createdAt, ...updatedData } = req.body;

    await new Servico.findByIdAndUpdate(req.params.id, updatedData);
    res.json({ servico: req.body });
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

router.get("/salao", async (_req, res) => {
  try {
    const servicos = await Servico.find({ status: "A" });
    res.json({
      servicos,
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Servico.findByIdAndUpdate(id, { status: "E" });
    res.json({
      error: false,
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
