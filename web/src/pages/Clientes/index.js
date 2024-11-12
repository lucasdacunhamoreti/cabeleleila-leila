import React, { useEffect } from "react";

import Table from "../../components/Table";
import { allClientes } from "../../store/modules/cliente/actions";

import { useDispatch, useSelector } from "react-redux";

import { Button } from "rsuite";

const clientes = [
  {
    id: "1a2b3c",
    nome: "Lucas Silva",
    telefone: "(11) 91234-5678",
    email: "lucas.silva@example.com",
  },
  {
    id: "4d5e6f",
    nome: "Mariana Souza",
    telefone: "(21) 99876-5432",
    email: "mariana.souza@example.com",
  },
  {
    id: "7g8h9i",
    nome: "João Oliveira",
    telefone: "(31) 98765-4321",
    email: "joao.oliveira@example.com",
  },
  {
    id: "0j1k2l",
    nome: "Fernanda Pereira",
    telefone: "(41) 97654-3210",
    email: "fernanda.pereira@example.com",
  },
  {
    id: "3m4n5o",
    nome: "Ana Costa",
    telefone: "(51) 96543-2109",
    email: "ana.costa@example.com",
  },
  {
    id: "6p7q8r",
    nome: "Gabriel Ferreira",
    telefone: "(61) 95432-1098",
    email: "gabriel.ferreira@example.com",
  },
  {
    id: "9s0t1u",
    nome: "Juliana Almeida",
    telefone: "(71) 94321-0987",
    email: "juliana.almeida@example.com",
  },
  {
    id: "2v3w4x",
    nome: "Carlos Martins",
    telefone: "(81) 93210-9876",
    email: "carlos.martins@example.com",
  },
  {
    id: "5y6z7a",
    nome: "Bianca Gomes",
    telefone: "(91) 92109-8765",
    email: "bianca.gomes@example.com",
  },
  {
    id: "8b9c0d",
    nome: "Rafael Rodrigues",
    telefone: "(71) 91098-7654",
    email: "rafael.rodrigues@example.com",
  },
];

const Clientes = () => {
  const dispatch = useDispatch();
  const { clientes } = useSelector((state) => state.clientes);

  useEffect(() => {
    dispatch(allClientes());
  }, []);

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Clientes</h2>
            <div>
              <button className="btn btn-primary btn-lg">
                <span className="mdi mdi-plus">Novo Cliente</span>
              </button>
            </div>
          </div>
          <Table
            data={clientes}
            config={[
              { label: "Nome", key: "nome", flexGrow: 1 },
              { label: "Telefone", key: "telefone", flexGrow: 1 },
              { label: "E-mail", key: "email", flexGrow: 1 },
            ]}
            actions={() => <Button size="xs">Ver informações</Button>}
            onRowClick={(e) => {
              alert(e.nome);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Clientes;
