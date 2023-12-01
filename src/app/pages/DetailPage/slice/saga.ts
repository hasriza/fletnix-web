import { call, put, takeLatest } from 'redux-saga/effects';
import { detailPageActions as actions } from '.';
import { request } from 'utils/request';
import { V1_APIS } from 'config/api-variables';

function* fetchShowDetails(data: any) {
  const { payload } = data;

  const requestURL = V1_APIS + '/content/' + payload.showId;
  try {
    const response = yield call(request, requestURL, {}, true, {}, 'GET');
    console.log(response);
    if (response?.status === 'OK') {
      yield put(actions.fetchDetailsEnd(response.showDetails));
    } else {
      yield put(actions.fetchDetailsError(response?.message));
    }
  } catch (err: any) {
    if (err?.response?.status === 404) {
      yield put(actions.fetchDetailsError(err?.message));
    }
  }
}

export function* detailPageSaga() {
  yield takeLatest(actions.fetchDetailsStart.type, fetchShowDetails);
}
