import {useAppDispatch} from "../store";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as fundActions from '../store/funds/asyncActions'
import * as authActions from '../store/auth/asyncActions'

const actions = {
    ...fundActions,
    ...authActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(actions, dispatch)
}