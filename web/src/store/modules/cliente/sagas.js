import { takeLatest, all, call, put, select } from "redux-saga/effects";

import { updateClientes } from "./actions";
import types from "./types";
import api from "../../../services/api";

export function* allClientes() {
  try {
    const { data: res } = yield call(api.get, `/cliente`);

    if (res.error) {
      alert(res.message);
      return false;
    }
    yield put(updateClientes({ clientes: res.clientes }));
  } catch (err) {
    alert(err.message);
  }
}

export default all([takeLatest(types.UPDATE_CLIENTE, allClientes)]);
