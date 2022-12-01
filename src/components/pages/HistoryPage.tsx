import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import errorDisplay from "../../utils/errorDisplay";
import {fundApi} from "../../services/RTK/fundApi";
import Layout from "../layouts/Layout";

export const HistoryPage = React.memo(() => {

    const {data, isLoading, error} = fundApi.useFetchAllFundsQuery(null)

    useEffect(() => {
        if (error) {
            errorDisplay(error)
        }
    }, [error])

    return (
        <Layout>
            {isLoading ? (
                <h4>Loading...</h4>
            ) : (
                <div>
                    <h4>History</h4>
                    <>
                        {data?.items.map((fund) => (
                            <div key={fund._id}>
                                <Link to={`/history/${fund._id}`}>{fund.title}</Link>
                            </div>
                        ))}
                    </>
                </div>
            )}
        </Layout>
    );
});

