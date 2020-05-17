import {createSelector} from '@reduxjs/toolkit';

const _getToken = state => state.user.token;
const _getLoginStatus = state => state.user.isLoggedIn;
const _getUser = state => state.user;

export const getToken = createSelector(_getToken, token => token);

export const getLoginStatus = createSelector(_getLoginStatus, isLoggedIn => isLoggedIn);
export const getUser = createSelector(_getUser, user => user);