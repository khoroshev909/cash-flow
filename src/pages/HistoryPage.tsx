import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store";
import {fetchFunds} from "../store/funds/actions";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {fundsResetError} from "../store/funds/fundSlice";

export const HistoryPage = () => {

    const dispatch = useAppDispatch()

    const { loading, funds, error } = useAppSelector(state => state.funds)

    useEffect(() => {
        dispatch(fetchFunds())
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
            <h4>History</h4>
            <>
                {funds.map((fund) => (
                    <div key={fund._id}>
                        <Link to={`/history/${fund._id}`}>{fund.title}</Link>
                    </div>
                ))}
            </>
        </div>
    );
};
