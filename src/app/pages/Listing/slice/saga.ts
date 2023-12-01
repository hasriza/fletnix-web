import { call, put, takeLatest } from 'redux-saga/effects';
import { listingActions as actions } from '.';
import { V1_APIS } from 'config/api-variables';
import { request } from 'utils/request';

function* fetchShowsList(data: any) {
  const requestURL = V1_APIS + '/content';

  const { payload } = data;

  try {
    const response = yield call(request, requestURL, payload);
    if (response?.status === 'OK') {
      yield put(actions.fetchListEnd({ ...response, page: payload?.page + 1 }));
    } else {
      yield put(actions.fetchListError(response?.message));
    }
  } catch (err: any) {
    if (err?.response?.status === 404) {
      yield put(actions.fetchListError(err?.message));
    }
  }
}

export function* listingSaga() {
  yield takeLatest(actions.fetchListStart.type, fetchShowsList);
}
