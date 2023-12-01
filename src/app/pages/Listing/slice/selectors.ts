import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.listing || initialState;

export const selectListing = createSelector([selectSlice], state => state);
