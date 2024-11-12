import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAgendamentos } from "../../store/modules/agendamento/actions";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/pt-br";

import util from "../../util";

moment.locale("pt-br");

const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Dia Inteiro",
  previous: "Anterior",
  next: "Próximo",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Não há eventos neste período.",
  showMore: (count) => `+ Ver mais (${count})`,
};

const Agendamentos = () => {
  const dispatch = useDispatch();
  const { agendamentos } = useSelector((state) => state.agendamento);

  const formatEventos = () => {
    return agendamentos.map((agendamento) => ({
      resource: { agendamento },
      title: `${agendamento.servicoId.titulo} - ${agendamento.clienteId.nome} - ${agendamento.colaboradorId.nome}`,
      start: moment(agendamento.data).toDate(),
      end: moment(agendamento.data)
        .add(
          util.hourToMinutes(
            moment(agendamento.servicoId.duracao).format("HH:mm")
          ),
          "minutes"
        )
        .toDate(),
    }));
  };

  useEffect(() => {
    dispatch(
      filterAgendamentos({
        start: moment().weekday(0).format("YYYY-MM-DD"),
        end: moment().weekday(6).format("YYYY-MM-DD"),
      })
    );
  }, [dispatch]);

  const formatRange = (range) => {
    if (Array.isArray(range)) {
      return {
        start: moment(range[0]).format("YYYY-MM-DD"),
        end: moment(range[range.length - 1]).format("YYYY-MM-DD"),
      };
    }
    return {
      start: moment(range.start).format("YYYY-MM-DD"),
      end: moment(range.end).format("YYYY-MM-DD"),
    };
  };

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 mt-0">Agendamentos</h2>
          <Calendar
            localizer={localizer}
            onRangeChange={(range) =>
              dispatch(filterAgendamentos(formatRange(range)))
            }
            onSelectEvent={() => {}}
            events={formatEventos()}
            defaultView="week"
            selectable
            popup
            style={{ height: 600 }}
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
};

export default Agendamentos;
