import { SagaIterator } from "redux-saga";
import { put, takeEvery } from "redux-saga/effects";

import {
  setCurrentArrival,
  setCurrentForm,
  setCurrentSending,
} from "store/actions";
import { CurrentFormType, LocationType } from "store/reducers/types";

function* selectCurrentFormWorker(
  action: ReturnType<typeof sagaSelectForm>
): SagaIterator {
  yield put(setCurrentForm({ ...action.data }));
}

export const sagaSelectForm = (data: CurrentFormType) =>
  ({
    type: "SAGA/SELECT_FORM",
    data,
  } as const);

function* setCurrentSendingWorker(
  action: ReturnType<typeof sagaSetCurrentSending>
): SagaIterator {
  yield put(setCurrentSending(action.payload.location, action.payload.id));
}

export const sagaSetCurrentSending = (location: LocationType, id: number) =>
  ({
    type: "SAGA/SELECT_CURRENT_SENDING",
    payload: { location, id },
  } as const);

function* setCurrentArrivalWorker(
  action: ReturnType<typeof sagaSetCurrentArrival>
): SagaIterator {
  yield put(setCurrentArrival(action.payload.location, action.payload.id));
}

export const sagaSetCurrentArrival = (location: LocationType, id: number) =>
  ({
    type: "SAGA/SELECT_CURRENT_ARRIVAL",
    payload: { location, id },
  } as const);

export function* selectCurrentFormWatcher(): SagaIterator {
  yield takeEvery("SAGA/SELECT_FORM", selectCurrentFormWorker);
  yield takeEvery("SAGA/SELECT_CURRENT_SENDING", setCurrentSendingWorker);
  yield takeEvery("SAGA/SELECT_CURRENT_ARRIVAL", setCurrentArrivalWorker);
}
