import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store";
import {fetchFunds} from "../../store/funds/asyncActions";
import {Link} from "react-router-dom";
import {fundSelector} from "../../store/funds/selectors";
import errorDisplay from "../../utils/errorDisplay";

export const HistoryPage = React.memo(() => {

    const dispatch = useAppDispatch()
    const {loading, funds, error} = useAppSelector(fundSelector())

    useEffect(() => {
        if (!funds.length) {
            dispatch(fetchFunds())
        }
    }, [])

    useEffect(() => {
        if (error) {
            errorDisplay(error)
        }
    }, [error])

    return (
        <>
            {loading ? (
                <h4>Loading...</h4>
            ) : (
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
            )}
        </>
    );
});

