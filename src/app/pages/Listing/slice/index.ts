import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { listingSaga } from './saga';
import { ListingState } from './types';

export const initialState: ListingState = {
  loading: false,
  error: null,
  showList: [],
  totalShows: 15,
  currPage: 1,
};

const slice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    fetchListStart(state, action: PayloadAction<any>) {
      state.error = null;
      state.loading = true;
    },
    fetchListEnd(state, action: PayloadAction<any>) {
      state.showList =
        action.payload?.page === 2
          ? action.payload?.showsList
          : [...state.showList, ...action.payload?.showsList];
      state.totalShows = action.payload?.totalPages;
      state.currPage = action.payload?.page;
      state.error = null;
      state.loading = false;
    },
    fetchListError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: listingActions } = slice;

export const useListingSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: listingSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useListingSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
