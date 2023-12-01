import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.detailPage || initialState;

export const selectDetailPage = createSelector([selectSlice], state => state);
