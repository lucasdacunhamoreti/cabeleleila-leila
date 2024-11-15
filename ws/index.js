const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("./database");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.set("port", 8000);

app.use("/cliente", require("./src/routes/cliente.routes"));
app.use("/servico", require("./src/routes/servico.routes"));
app.use("/horario", require("./src/routes/horario.routes"));
app.use("/agendamento", require("./src/routes/agendamento.routes"));
app.use("/login", require("./src/routes/login.routes"));

app.listen(app.get("port"), () => {
  console.log(`WS executando na porta ${app.get("port")}`);
});
