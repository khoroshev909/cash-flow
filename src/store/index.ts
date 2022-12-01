import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {billApi} from "../services/RTK/billApi";
import {fundApi} from "../services/RTK/fundApi";
import currentFundReducer from "./funds/currentFundSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
  [billApi.reducerPath]: billApi.reducer,
  [fundApi.reducerPath]: fundApi.reducer,
  currentFund: currentFundReducer
})

function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(billApi.middleware, fundApi.middleware)
  });
}

const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store


