import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  updateServico,
  addServico,
  saveServico,
  allServicos,
  resetServico,
  removeServico,
} from "../../store/modules/servico/actions";
import util from "../../services/util";

import { DatePicker, Drawer, Button, Notification } from "rsuite";

import "rsuite/dist/rsuite.min.css";
import "rsuite/styles/index.less";

import Table from "../../components/Table";

const Servicos = () => {
  const dispatch = useDispatch();
  const { servico, servicos, form, components, behavior } = useSelector(
    (state) => state.servico
  );

  const setServico = (key, value) => {
    dispatch(
      updateServico({
        servico: { ...servico, [key]: value },
      })
    );
  };

  const setComponents = (component, state) => {
    dispatch(
      updateServico({
        components: { ...components, [component]: state },
      })
    );
  };

  const save = () => {
    if (
      !util.allFields(servico, [
        "titulo",
        "preco",
        "duracao",
        "descricao",
        "status",
      ])
    ) {
      Notification.error({
        placement: "topStart",
        title: "Calma lá!",
        description: "Antes de prosseguir, preencha todos os campos!",
      });
      return false;
    }

    if (behavior === "create") {
      dispatch(addServico());
    } else {
      dispatch(saveServico());
    }
  };

  const edit = (servico) => {
    dispatch(
      updateServico({
        servico,
        behavior: "update",
      })
    );

    setComponents("drawer", true);
  };

  useEffect(() => {
    dispatch(allServicos());
  }, []);

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer
        open={components.drawer}
        size="sm"
        onClose={() => setComponents("drawer", false)}
      >
        <Drawer.Body>
          <h3>{behavior === "create" ? "Criar" : "Atualizar"} serviço</h3>
          <div className="row mt-3">
            <div className="form-group col-6">
              <b className="">Título</b>
              <input
                type="text"
                className="form-control"
                placeholder="Titulo do serviço"
                value={servico.titulo}
                onChange={(e) => {
                  setServico("titulo", e.target.value);
                }}
              />
            </div>
            <div className="form-group col-3">
              <b className="">R$ Preço</b>
              <input
                type="number"
                className="form-control"
                placeholder="Preço do serviço"
                value={servico.preco}
                onChange={(e) => setServico("preco", e.target.value)}
              />
            </div>
            <div className="form-group col-3">
              <b className="">Recorr. (dias)</b>
              <input
                type="number"
                className="form-control"
                placeholder="Recorrência do serviço"
                value={servico.recorrencia}
                onChange={(e) => setServico("recorrencia", e.target.value)}
              />
            </div>

            <div className="form-group col-4">
              <b className="d-block">Duração</b>
              <DatePicker
                block
                format="HH:mm"
                value={servico.duracao}
                hideMinutes={(min) => ![0, 30].includes(min)}
                onChange={(e) => {
                  setServico("duracao", e);
                }}
              />
            </div>

            <div className="form-group col-12">
              <b className="">Descrição</b>
              <textarea
                rows="5"
                className="form-control"
                placeholder="Descrição do serviço..."
                value={servico.descricao}
                onChange={(e) => setServico("descricao", e.target.value)}
              ></textarea>
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
            Salvar Serviço
          </Button>
        </Drawer.Body>
      </Drawer>

      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Serviços</h2>
            <div>
              <button
                onClick={() => {
                  dispatch(
                    updateServico({
                      behavior: "create",
                    })
                  );
                  dispatch(resetServico());
                  setComponents("drawer", true);
                }}
                className="btn btn-primary btn-lg"
              >
                <span className="mdi mdi-plus"></span> Novo Serviço
              </button>
            </div>
          </div>

          <Table
            data={servicos}
            loading={form.filtering}
            config={[
              {
                label: "Titulo",
                key: "titulo",
                flexGrow: 1,
              },
              {
                label: "R$ Preço",
                key: "preco",
                content: (preco) => `R$ ${preco.toFixed(2)}`,
                flexGrow: 1,
              },

              {
                label: "Recorrência (dias)",
                key: "recorrencia",
                content: (recorrencia) => `${recorrencia} dias`,
                flexGrow: 1,
              },
              {
                label: "Duração",
                key: "duracao",
                flexGrow: 1,
                content: (duracao) => moment(duracao).format("HH:mm"),
              },
            ]}
            actions={(item) => (
              <>
                <Button
                  color="blue"
                  size="xs"
                  onClick={() => {
                    edit(item);
                  }}
                >
                  <span class="mdi mdi-pencil"></span>
                </Button>
              </>
            )}
            onRowClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Servicos;
