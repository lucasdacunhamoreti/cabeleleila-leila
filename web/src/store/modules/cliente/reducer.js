import produce from "immer";
import types from "./types";

const INITIAL_STATE = {
  behavior: "create",
  components: {
    drawer: false,
    confirmDelete: false,
    tab: "dados-cadastrais",
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  clientes: [],
  cliente: {
    nome: "",
    telefone: "",
    email: "",
    sexo: "F",
  },
};

function cliente(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_CLIENTE: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }

    case types.FILTER_CLIENTE: {
      return produce(state, (draft) => {
        draft.form.filtering = true;
        return draft;
      });
    }

    case types.RESET_CLIENTE: {
      return produce(state, (draft) => {
        draft.cliente = INITIAL_STATE.cliente;
        return draft;
      });
    }
    default:
      return state;
  }
}

export default cliente;
