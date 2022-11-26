import { createSelector } from 'reselect';
import { UserReudcerState } from './user-reducer';
import { RootState } from '../store';

export const selectUserReducer = (state: RootState): UserReudcerState =>
    state.user;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    user => user.currentUser
);
