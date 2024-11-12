const express = require("express");
const router = express.Router();
const Cliente = require("../models/cliente");
const Servico = require("../models/servico");
const Agendamento = require("../models/agendamento");
const moment = require("moment/moment");
const Horario = require("../models/horario");
const util = require("../util");

router.post("/", async (req, res) => {
  try {
    const { servicoId } = req.body;

    const servico = await Servico.findById(servicoId).select("preco");

    const agendamento = await new Agendamento({
      ...req.body,
      preco: servico.preco,
    }).save();

    res.json({ error: false, agendamento });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post("/filter", async (req, res) => {
  try {
    const { periodo } = req.body;

    const agendamentos = await Agendamento.find({
      status: "A",
      data: {
        $gte: moment(periodo.inicio).startOf("day"),
        $lte: moment(periodo.final).endOf("day"),
      },
    }).populate([
      { path: "servicoId", select: "titulo duracao" },
      { path: "clienteId", select: "nome" },
    ]);

    res.json({ error: false, agendamentos });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post("/dias-disponiveis", async (req, res) => {
  try {
    const { data, servicoId } = req.body;
    const servico = await Servico.findById(servicoId).select("duracao");
    const horarios = await Horario.find();

    let agenda = [];
    let lastDay = moment(data);

    const servicoMinutos = util.hourToMinutes(
      moment(servico.duracao).format("HH:mm")
    );
    const servicoSlots = util.sliceMinutes(
      servico.duracao,
      moment(servico.duracao).add(servicoMinutos, "minutes"),
      util.SLOT_DURATION
    );

    // VALIDAR FLUXO

    // for (let i = 0; i <= 365 && agenda.length <= 7; i += 1) {
    //   const espacosValidos = horarios.filter((horario) => {
    //     const diaSemanaDisponivel = horario.dias.includes(
    //       moment(lastDay).day()
    //     );

    //     const servicoDisponivel = horario.especialidades.includes(servicoId);
    //     return diaSemanaDisponivel && servicoDisponivel;
    //   });

    //   if (espacosValidos.length > 0) {
    //     // TODOS OS HORÁRIOS DISPONÍVEIS DAQUELE DIA
    //     let todosHorariosDia = {};
    //     for (let espaco of espacosValidos) {
    //       for (let colaborador of espaco.colaboradores) {
    //         if (!todosHorariosDia[colaborador._id]) {
    //           todosHorariosDia[colaborador._id] = [];
    //         }
    //         todosHorariosDia[colaborador._id] = [
    //           ...todosHorariosDia[colaborador._id],
    //           ...util.sliceMinutes(
    //             util.mergeDateTime(lastDay, espaco.inicio),
    //             util.mergeDateTime(lastDay, espaco.fim),
    //             util.SLOT_DURATION
    //           ),
    //         ];
    //       }
    //     }

    //     // SE TODOS OS ESPECIALISTAS DISPONÍVEIS ESTIVEREM OCUPADOS NO HORÁRIO, REMOVER
    //     for (let colaboradorKey of Object.keys(todosHorariosDia)) {
    //       // LER AGENDAMENTOS DAQUELE ESPECIALISTA NAQUELE DIA
    //       const agendamentos = await Agendamento.find({
    //         colaboradorId: colaboradorKey,
    //         data: {
    //           $gte: moment(lastDay).startOf("day"),
    //           $lte: moment(lastDay).endOf("day"),
    //         },
    //       }).select("data -_id");

    //       // RECUPERANDO HORÁRIOS OCUPADOS
    //       let horariosOcupado = agendamentos.map((a) => ({
    //         inicio: moment(a.data),
    //         fim: moment(a.data).add(servicoDuracao, "minutes"),
    //       }));

    //       horariosOcupado = horariosOcupado
    //         .map((h) =>
    //           util.sliceMinutes(h.inicio, h.fim, util.SLOT_DURATION, false)
    //         )
    //         .flat();

    //       // REMOVENDO TODOS OS HORÁRIOS QUE ESTÃO OCUPADOS
    //       let horariosLivres = util.splitByValue(
    //         _.uniq(
    //           todosHorariosDia[colaboradorKey].map((h) => {
    //             return horariosOcupado.includes(h) ? "-" : h;
    //           })
    //         ),
    //         "-"
    //       );

    //       // VERIFICANDO SE NOS HORÁRIOS CONTINUOS EXISTE SPAÇO SUFICIENTE NO SLOT
    //       horariosLivres = horariosLivres
    //         .filter((h) => h.length >= servicoDuracaoSlots)
    //         .flat();

    //       /* VERIFICANDO OS HORÁRIOS DENTRO DO SLOT
    //         QUE TENHAM A CONTINUIDADE NECESSÁRIA DO SERVIÇO
    //       */
    //       horariosLivres = horariosLivres.map((slot) =>
    //         slot.filter(
    //           (horario, index) => slot.length - index >= servicoDuracaoSlots
    //         )
    //       );

    //       // SEPARANDO 2 EM 2
    //       horariosLivres = _.chunk(horariosLivres, 2);

    //       // REMOVENDO O COLABORADOR DO DIA, CASO NÃO TENHA ESPAÇOS NA AGENDA
    //       if (horariosLivres.length === 0) {
    //         todosHorariosDia = _.omit(todosHorariosDia, colaboradorKey);
    //       } else {
    //         todosHorariosDia[colaboradorKey] = horariosLivres;
    //       }
    //     }

    //     // VERIFICANDO SE TEM ESPECIALISTA COMA AGENDA NAQUELE DIA
    //     const totalColaboradores = Object.keys(todosHorariosDia).length;

    //     if (totalColaboradores > 0) {
    //       colaboradores.push(Object.keys(todosHorariosDia));
    //       console.log(todosHorariosDia);
    //       agenda.push({
    //         [moment(lastDay).format("YYYY-MM-DD")]: todosHorariosDia,
    //       });
    //     }
    //   }

    //   lastDay = moment(lastDay).add(1, "day");
    // }

    res.json({ error: false, agenda });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
