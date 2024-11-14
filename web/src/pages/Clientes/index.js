import React, { useEffect } from "react";

import Table from "../../components/Table";
import {
  allClientes,
  updateCliente,
  filterCliente,
  addCliente,
} from "../../store/modules/cliente/actions";

import "rsuite/dist/rsuite.min.css";
import "rsuite/styles/index.less";

import { useDispatch, useSelector } from "react-redux";

import { Button, Drawer, Message, Notification } from "rsuite";
import util from "../../services/util";
import { notification } from "../../services/rsuite";

const Clientes = () => {
  const dispatch = useDispatch();
  const { clientes, form, components, behavior, cliente } = useSelector(
    (state) => state.cliente
  );

  const setComponents = (component, state) => {
    dispatch(
      updateCliente({
        components: { ...components, [component]: state },
      })
    );
  };

  useEffect(() => {
    dispatch(allClientes());
  }, []);

  const setCliente = (key, value) => {
    dispatch(
      updateCliente({
        cliente: { ...cliente, [key]: value },
      })
    );
  };

  const onRowClick = (cliente) => {
    dispatch(
      updateCliente({
        cliente,
        behavior: "update",
      })
    );
    setComponents("drawer", true);
  };

  const save = () => {
    if (
      !util.allFields(cliente, [
        "email",
        "nome",
        "telefone",
        "dataNascimento",
        "sexo",
      ])
    ) {
      notification("error", {
        // placement: "Calma lá!",
        title: "Ops...",
        description: "Antes de prosseguir, preencha todos os campos!",
      });
      return false;
    }

    dispatch(addCliente());
  };

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer
        open={components.drawer}
        size="sm"
        onClose={() => setComponents("drawer", false)}
      >
        <Drawer.Body>
          <h3>Criar novo cliente</h3>
          <div className="row mt-3">
            {behavior !== "create" && (
              <div className="col-12 my-3">
                <Message>
                  <strong>Peça ao cliente para baixar o app!</strong> Se você
                  precisa editar alguma informação do cliente, peça para que ele
                  baixa o aplicativo e faça as alterações.
                </Message>
                <Button block color="primary" className="mt-1">
                  Baixar o Aplicativo
                </Button>
              </div>
            )}
            <div className="form-group col-12">
              <b className="">E-mail</b>
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="E-mail do cliente"
                  disabled={behavior !== "create"}
                  onChange={(e) => {
                    setCliente("email", e.target.value);
                  }}
                  value={cliente.email}
                />
                {behavior === "create" && (
                  <div class="input-group-append">
                    <Button
                      appearance="primary"
                      loading={form.filtering}
                      disabled={form.filtering}
                      onClick={() => {
                        dispatch(
                          filterCliente({
                            filters: { email: cliente.email, status: "A" },
                          })
                        );
                      }}
                    >
                      Pesquisar
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group col-6">
              <b className="">Nome</b>
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Cliente"
                disabled={form.disabled}
                value={cliente.nome}
                onChange={(e) => setCliente("nome", e.target.value)}
              />
            </div>
            <div className="form-group col-6">
              <b className="">Telefone / Whatsapp</b>
              <input
                type="text"
                className="form-control"
                placeholder="Telefone / Whatsapp do Cliente"
                disabled={form.disabled}
                value={cliente.telefone}
                onChange={(e) => setCliente("telefone", e.target.value)}
              />
            </div>

            <div className="form-group col-6">
              <b className="">Data de Nascimento</b>
              <input
                type="date"
                className="form-control"
                disabled={form.disabled}
                value={cliente.dataNascimento}
                onChange={(e) => setCliente("dataNascimento", e.target.value)}
              />
            </div>
            <div className="form-group col-6">
              <b>Sexo</b>
              <select
                disabled={form.disabled}
                className="form-control"
                value={cliente.sexo}
                onChange={(e) => setCliente("sexo", e.target.value)}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
          </div>

          {behavior === "create" && (
            <Button
              block
              className="btn-lg mt-3"
              color={behavior === "create" ? "green" : "red"}
              size="lg"
              loading={form.saving}
              onClick={() => {
                if (behavior === "create") {
                  save();
                } else {
                  setComponents("confirmDelete", true);
                }
              }}
            >
              Salvar cliente
            </Button>
          )}
        </Drawer.Body>
      </Drawer>
      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Clientes</h2>
            <div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  dispatch(updateCliente({ behavior: "create" }));
                  setComponents("drawer", true);
                }}
              >
                <span className="mdi mdi-plus">Novo Cliente</span>
              </button>
            </div>
          </div>
          <Table
            loading={form.filtering}
            data={clientes}
            config={[
              { label: "Nome", key: "nome", flexGrow: 1 },
              { label: "Telefone", key: "telefone", flexGrow: 1 },
              { label: "E-mail", key: "email", flexGrow: 1 },
            ]}
            actions={() => <Button size="xs">Ver informações</Button>}
            onRowClick={(c) => {
              onRowClick(c);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Clientes;
