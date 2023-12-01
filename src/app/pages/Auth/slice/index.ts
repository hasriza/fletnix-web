import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { authSaga } from './saga';
import { AuthState } from './types';
import { getRefreshToken } from 'store/localStore';

export const initialState: AuthState = {
  loading: false,
  error: false,
  isAuthenticated: !!getRefreshToken(),
  isUserVerified: false,
  userDetails: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registrationStart(state, action: PayloadAction<any>) {
      state.error = null;
      state.loading = true;
    },
    loginStart(state, action: PayloadAction<any>) {
      state.error = null;
      state.loading = true;
    },
    refreshToken(state) {
      state.error = null;
      state.loading = true;
    },
    authEnd(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
      state.error = null;
      state.loading = false;
    },
    authError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutStart(state) {
      state.error = null;
      state.loading = true;
    },
    logoutEnd(state) {
      Object.keys(initialState).forEach(el => (state[el] = initialState[el]));
      state.isAuthenticated = false;
    },
  },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
