const express = require("express");
const router = express.Router();
const Cliente = require("../models/cliente");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Email e senha são obrigatórios." });
    }

    const cliente = await Cliente.findOne({ email });

    if (!cliente) {
      return res
        .status(404)
        .json({ error: true, message: "Cliente não encontrado." });
    }

    if (cliente.senha !== password) {
      return res.status(401).json({ error: true, message: "Senha incorreta." });
    }

    res.json({ cliente });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;
