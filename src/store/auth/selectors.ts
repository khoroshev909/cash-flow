import { RootState } from './../index'

export const isLoggedInSelector = () => (state: RootState) => state.auth.logged;
