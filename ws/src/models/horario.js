const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const horario = new Schema({
  especialidades: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Servico",
      required: true,
    },
  ],
  dias: {
    type: [Number],
    required: true,
  },
  inicio: {
    type: Date,
    required: true,
  },
  fim: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Horario", horario);
