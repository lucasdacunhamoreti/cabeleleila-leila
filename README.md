# Desafio Técnico - DSIN Tecnologia

Este projeto consiste em uma aplicação fullstack para gerenciamento de um salão de beleza, desenvolvida como parte de um desafio técnico para a empresa DSIN Tecnologia. O sistema inclui um **backend** para gerenciamento de dados e uma **aplicação frontend** para interação do usuário.

## Tecnologias Utilizadas

### Backend

- **Node.js**: Plataforma para construção do servidor.
- **Express**: Framework web para a criação de APIs.
- **Mongoose**: ODM para integração com MongoDB.
- **MongoDB Atlas**: Banco de dados NoSQL na nuvem.
- **Moment.js**: Manipulação e formatação de datas.
- **Cors**: Configuração de CORS para acesso da API.
- **Morgan**: Middleware para logging de requisições HTTP.

### Frontend

- **React**: Biblioteca para construção de interfaces do usuário.
- **React Router**: Gerenciamento de rotas no frontend.
- **Redux e Redux-Saga**: Gerenciamento de estado da aplicação.
- **Axios**: Cliente HTTP para comunicação com o backend.
- **React Big Calendar**: Componente para exibição de calendários.
- **RSuite**: Biblioteca de componentes de UI.

### Ferramentas de Apoio

- **Insomnia**: Para testar as rotas e endpoints do backend.
- **MongoDB Compass**: Ferramenta GUI para visualizar e gerenciar dados no MongoDB.

## Funcionalidades

### Backend

- Configurado com **Express** para gerenciamento de rotas e **MongoDB** para persistência de dados.
- **Endpoints** para CRUD de:
  - **Agendamentos**.
  - **Serviços** (não vinculados diretamente aos agendamentos no momento).
  - **Clientes**.

###### Observação: Este projeto utiliza o banco de dados MongoDB hospedado no MongoDB Atlas, uma solução em nuvem que facilita a criação, gerenciamento e escalabilidade do banco de dados de forma segura e eficiente. A string de conexão está no código fonte do projeto somente para fim deste projeto.

### Frontend

- Rotas implementadas:
  - `/login`: Página de autenticação.
  - `/agendamentos`: Permite criar e gerenciar agendamentos.
  - `/servicos`: Lista e cria serviços do salão.
  - `/clientes`: Criação e listagem de clientes.

## Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** >= 14.x
- **Yarn**

## Instalação e Execução

### Clonar o repositório

```bash
git clone git@github.com:lucasdacunhamoreti/cabeleleila-leila.git
cd cabeleleila-leila
```

## Instruções para execução

### Executar Backend

#### Para executar o backend da aplicação acesse a pasta ws, e utilize os seguintes comandos:

```bash
yarn install
yarn start
```

### Executar Web

#### Para executar o backend da aplicação acesse a pasta web, e utilize os seguintes comandos:

```bash
yarn install
yarn start
```

### Usuários

#### Há dois tipos de usuários da aplicação:

- Nome: Leila Garcia
- E-mail: leila@email.com
- Senha: 12345
- Obs: Este usuário é o dono do salão, no qual ele tem permissões de administrador. Este usuário pode cadastrar novos clientes, novos serviços, editar e cadastrar horários. Por padrão, a senha de um cliente cadastrado é 12345.

---

- Nome: Usuário cliente
- E-mail: cliente@email.com
- Senha: 12345
- Obs: Este usuário cliente, no qual ele pode apenas cadastrar horários de agendamento.
