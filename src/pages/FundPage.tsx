import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store";
import {getFundById} from "../store/funds/actions";
import {toast} from "react-toastify";
import {fundsResetError} from "../store/funds/fundSlice";

export const FundPage = () => {

    const {fundId} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, current, error } = useAppSelector(state => state.funds)

    useEffect(() => {
        dispatch(getFundById(fundId!))
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(fundsResetError())
        }
    }, [error])

    if (loading) {
        return <h4>Loading...</h4>
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>Назад</button>
            <h4>{current?.title}</h4>
            <p>{current?.type} {current?.amount}</p>
        </div>
    );
};
