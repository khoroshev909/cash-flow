import { RootState } from './../index'

export const isLoggedInSelector = () => (state: RootState) => state.auth.logged;

export const authIdSelector = () => (state: RootState) => state.auth.authId;