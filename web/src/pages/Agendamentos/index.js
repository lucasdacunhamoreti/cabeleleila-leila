import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  TagPicker,
  Drawer,
  Checkbox,
  DatePicker,
  Button,
  Notification,
} from "rsuite";

import "rsuite/dist/rsuite.min.css";
import "rsuite/styles/index.less";

import {
  allHorarios,
  addHorario,
  removeHorario,
  updateHorario,
  saveHorario,
} from "../../store/modules/horario/actions";
import util from "../../services/util";
import colors from "../../data/colors.json";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const Agendamentos = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const { horario, horarios, form, components, behavior } = useSelector(
    (state) => state.horario
  );

  const diasDaSemana = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  const getDiasSemanaData = () => {
    const startOfWeek = moment().startOf("week");
    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.clone().add(i, "days").toDate()
    );
  };

  const setHorario = (key, value) => {
    dispatch(
      updateHorario({
        horario: { ...horario, [key]: value },
      })
    );
  };

  const setComponents = (component, state) => {
    dispatch(
      updateHorario({
        components: { ...components, [component]: state },
      })
    );
  };

  const onHorarioClick = (horario) => {
    console.log(horario);

    dispatch(
      updateHorario({
        horario,
        behavior: "update",
      })
    );
    setComponents("drawer", true);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (user && user.cliente.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const save = () => {
    if (!util.allFields(horario, ["dias", "inicio", "fim"])) {
      Notification.error({
        placement: "topStart",
        title: "Calma lá!",
        description: "Antes de prosseguir, preencha todos os campos!",
      });
      return false;
    }

    if (behavior === "create") {
      dispatch(addHorario());
    } else {
      dispatch(saveHorario());
    }
  };

  const remove = () => {
    dispatch(removeHorario());
  };

  const formatEventos = () => {
    let listaEventos = [];

    horarios.map((hor, index) => {
      hor.dias.map((dia) => {
        listaEventos.push({
          resource: { horario: hor, backgroundColor: colors[index] },
          title:
            hor.clienteId.role === "admin"
              ? `Criado por Leila (Profisisonal)`
              : `Cliente: ${hor.clienteId.nome}`,
          start: new Date(
            getDiasSemanaData()[dia].setHours(
              parseInt(moment(hor.inicio).format("HH")),
              parseInt(moment(hor.inicio).format("mm"))
            )
          ),
          end: new Date(
            getDiasSemanaData()[dia].setHours(
              parseInt(moment(hor.fim).format("HH")),
              parseInt(moment(hor.fim).format("mm"))
            )
          ),
        });
      });
    });

    return listaEventos;
  };

  useEffect(() => {
    dispatch(allHorarios());
  }, []);

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer
        open={components.drawer}
        size="sm"
        onClose={() => setComponents("drawer", false)}
      >
        <Drawer.Body>
          <h3>Atendimento</h3>
          <div className="row mt-3">
            <div className="col-12">
              <b>Dias da semana</b>
              <TagPicker
                size="lg"
                block
                value={horario.dias}
                data={diasDaSemana.map((label, value) => ({ label, value }))}
                onChange={(value) => {
                  setHorario("dias", value);
                }}
              />
              <Checkbox
                disabled={horario.dias.length === diasDaSemana.length}
                checked={horario.dias.length === diasDaSemana.length}
                onChange={(v, selected) => {
                  if (selected) {
                    setHorario(
                      "dias",
                      diasDaSemana.map((label, value) => value)
                    );
                  } else {
                    setHorario("dias", []);
                  }
                }}
              >
                {" "}
                Selecionar Todos
              </Checkbox>
            </div>
            <div className="col-6 mt-3">
              <b className="d-block">Horário Inicial</b>
              <DatePicker
                block
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                value={horario.inicio}
                onChange={(e) => {
                  setHorario("inicio", e);
                }}
              />
            </div>
            <div className="col-6 mt-3">
              <b className="d-block">Horário Final</b>
              <DatePicker
                block
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                value={horario.fim}
                onChange={(e) => {
                  setHorario("fim", e);
                }}
              />
            </div>
          </div>
          <Button
            loading={form.saving}
            color={behavior === "create" ? "green" : "primary"}
            size="lg"
            block
            onClick={() => save()}
            className="mt-3"
          >
            Confirmar
          </Button>
          {behavior === "update" && (
            <Button
              loading={form.saving}
              color="red"
              size="lg"
              block
              onClick={() => {
                setComponents("confirmDelete", true);
                remove();
              }}
              className="mt-1"
            >
              Remover Horário de Atendimento
            </Button>
          )}
        </Drawer.Body>
      </Drawer>

      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <div className="mb-5">
              <h2 className="mt-0">Agendar horário</h2>
              <h4 style={{ color: "#6c757d" }}>
                Aqui você pode agendar seu horário conosco!
              </h4>
            </div>

            <div>
              <button
                onClick={() => setComponents("drawer", true)}
                className="btn btn-primary btn-lg"
              >
                <span className="mdi mdi-plus"></span> Novo Horario
              </button>
            </div>
          </div>

          <Calendar
            localizer={localizer}
            onSelectEvent={(e) => {
              const { horario } = e.resource;

              if (!isAdmin) {
                if (
                  moment().isSameOrAfter(
                    moment(horario.inicio).subtract(2, "days")
                  )
                ) {
                  alert(
                    "Você não tem permissão para editar esse horário. Para mais informações, entre em contato pelo telefone (99) 99999-9999."
                  );
                } else {
                  onHorarioClick(horario);
                }
                return;
              }

              onHorarioClick(horario);
            }}
            onSelectSlot={(slotInfo) => {
              const { start, end } = slotInfo;
              dispatch(
                updateHorario({
                  horario: {
                    ...horario,
                    dias: [moment(start).day()],
                    inicio: start,
                    fim: end,
                  },
                })
              );
              setComponents("drawer", true);
            }}
            formats={{
              dateFormat: "dd",
              dayFormat: (date, culture, localizer) =>
                localizer.format(date, "dddd", culture),
            }}
            events={formatEventos()}
            eventPropGetter={(event, start, end, isSelected) => {
              return {
                style: {
                  backgroundColor: event.resource.backgroundColor,
                  borderColor: event.resource.backgroundColor,
                },
              };
            }}
            date={getDiasSemanaData()[moment().day()]}
            view={components.view}
            selectable={true}
            popup={true}
            toolbar={false}
            style={{ height: 600 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Agendamentos;
