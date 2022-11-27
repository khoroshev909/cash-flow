import {configureStore, combineReducers} from '@reduxjs/toolkit';
import fundReducer from "./funds/fundSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
  funds: fundReducer
})

function setupStore() {
  return configureStore({
    reducer: rootReducer
  });
}

const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store


