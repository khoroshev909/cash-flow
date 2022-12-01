import {useAppDispatch} from "../store";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as fundActions from '../store/funds/asyncActions'

const actions = {
    ...fundActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(actions, dispatch)
}