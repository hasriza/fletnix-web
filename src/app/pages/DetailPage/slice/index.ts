import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { detailPageSaga } from './saga';
import { DetailPageState } from './types';

export const initialState: DetailPageState = {
  loading: false,
  error: null,
  showDetails: {},
};

const slice = createSlice({
  name: 'detailPage',
  initialState,
  reducers: {
    fetchDetailsStart(state, action: PayloadAction<any>) {
      state.error = null;
      state.loading = true;
    },
    fetchDetailsEnd(state, action: PayloadAction<any>) {
      state.showDetails = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchDetailsError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: detailPageActions } = slice;

export const useDetailPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: detailPageSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useDetailPageSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
