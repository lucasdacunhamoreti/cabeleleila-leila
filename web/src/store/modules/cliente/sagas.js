import { takeLatest, all, call, put, select } from "redux-saga/effects";

import {
  updateCliente,
  resetCliente,
  allClientes as allClientesAction,
} from "./actions";
import types from "./types";
import api from "../../../services/api";

import { notification } from "../../../services/rsuite";

export function* allClientes() {
  const { form } = yield select((state) => state.cliente);
  try {
    yield put(updateCliente({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.get, `/cliente`);

    yield put(updateCliente({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }
    yield put(updateCliente({ clientes: res.clientes }));
  } catch (err) {
    yield put(updateCliente({ form: { ...form, filtering: false } }));

    alert(err.message);
  }
}

export function* filterCliente({ filters }) {
  const { form } = yield select((state) => state.cliente);

  try {
    yield put(updateCliente({ form: { ...form, filtering: true } }));

    const { data: res } = yield call(api.post, "/cliente/filter", filters);
    yield put(updateCliente({ form: { ...form, filtering: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification("error", {
        placement: "topStart",
        title: "Ops...",
        description: res.message,
      });
      return false;
    }

    if (res.clientes.length > 0) {
      yield put(
        updateCliente({
          cliente: res.clientes[0],
          form: { ...form, filtering: false, disabled: true },
        })
      );
    } else {
      yield put(
        updateCliente({
          form: { ...form, filtering: false, disabled: false },
        })
      );
    }

    console.log(res.clientes);
  } catch (err) {
    // COLOCAR AQUI O ALERT DO RSUITE
    yield put(updateCliente({ form: { ...form, filtering: false } }));
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}

export function* addCliente() {
  try {
    const { cliente, form, components } = yield select(
      (state) => state.cliente
    );
    yield put(updateCliente({ form: { ...form, saving: true } }));

    const { data: res } = yield call(api.post, "/cliente", {
      cliente,
    });
    yield put(updateCliente({ form: { ...form, saving: false } }));

    if (res.error) {
      notification("error", {
        placement: "topStart",
        title: "Ops...",
        description: res.message,
      });
      return false;
    }

    yield put(allClientesAction());
    yield put(updateCliente({ components: { ...components, drawer: false } }));
    yield put(resetCliente());

    notification("success", {
      placement: "topStart",
      title: "Feitoooo!!",
      description: "Cliente salvo com sucesso!",
    });
  } catch (err) {
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}

export default all([
  takeLatest(types.ADD_CLIENTE, addCliente),
  takeLatest(types.FILTER_CLIENTE, filterCliente),
  takeLatest(types.ALL_CLIENTES, allClientes),
]);
