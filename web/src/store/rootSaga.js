import { all } from "redux-saga/effects";

import agendamento from "./modules/agendamento/reducer";

export default function* rootSaga() {
  return yield all([agendamento]);
}
