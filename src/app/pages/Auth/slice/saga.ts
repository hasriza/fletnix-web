import { all, call, put, takeLatest } from 'redux-saga/effects';
import { authActions as actions } from '.';

import { AUTH_APIS } from 'config/api-variables';
import { request } from 'utils/request';
import {
  getRefreshToken,
  logoutClearLocal,
  setAccessToken,
  setAccessTokenExpiration,
  setRefreshToken,
  setRefreshTokenExpiration,
} from 'store/localStore';

function setTokens(tokenObj: { access: object; refresh: object } | any) {
  setAccessToken(tokenObj?.access?.token);
  setAccessTokenExpiration(tokenObj?.access?.expires);
  setRefreshToken(tokenObj?.refresh?.token);
  setRefreshTokenExpiration(tokenObj?.refresh?.expires);
}

function* registerUser(data: any) {
  const requestURL = AUTH_APIS + '/register';

  const { payload } = data;

  try {
    const response = yield call(request, requestURL, payload, false);
    if (response?.status === 'OK') {
      yield all([
        call(setTokens, response.tokens),
        put(actions.authEnd(response.user)),
      ]);
    } else {
      yield put(actions.authError(response?.message));
    }
  } catch (err: any) {
    if (err?.response?.status === 404) {
      yield put(actions.authError(err?.message));
    }
  }
}

function* logUserIn(data: any) {
  const requestURL = AUTH_APIS + '/login';

  const { payload } = data;

  try {
    const response = yield call(request, requestURL, payload, false);
    if (response?.status === 'OK') {
      yield all([
        call(setTokens, response.tokens),
        put(actions.authEnd(response.user)),
      ]);
    } else {
      yield put(actions.authError(response?.message));
    }
  } catch (err: any) {
    if (err?.response?.status === 404) {
      yield put(actions.authError(err?.message));
    }
  }
}

function* refreshTokens() {
  const requestURL = AUTH_APIS + '/refresh-tokens';

  try {
    const response = yield call(request, requestURL, {
      refreshToken: getRefreshToken(),
    });
    if (response?.status === 'OK') {
      yield all([
        call(setTokens, response.tokens),
        put(actions.authEnd(response.user)),
      ]);
    } else {
      yield put(actions.authError(response?.message));
    }
  } catch (err: any) {
    if (err?.response?.status === 404) {
      yield put(actions.authError(err?.message));
    }
  }
}

export function* logUserOut() {
  const requestURL = AUTH_APIS + '/logout';

  try {
    const response = yield call(
      request,
      requestURL,
      { refreshToken: getRefreshToken() },
      false,
    );

    if (response?.status === 'OK') {
      logoutClearLocal();
      yield put(actions.logoutEnd());
    } else {
      yield put(actions.authError(response?.message));
    }
  } catch (err: any) {
    yield put(actions.authError(err?.response?.message));
  }
}

export function* authSaga() {
  yield takeLatest(actions.registrationStart.type, registerUser);
  yield takeLatest(actions.loginStart.type, logUserIn);
  yield takeLatest(actions.refreshToken.type, refreshTokens);
  yield takeLatest(actions.logoutStart.type, logUserOut);
}
