const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agendamento = new Schema({
  clienteId: {
    type: mongoose.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  servicoId: {
    type: mongoose.Types.ObjectId,
    ref: "Servico",
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Agendamento", agendamento);
