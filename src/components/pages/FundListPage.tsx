import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import errorDisplay from "../../utils/errorDisplay";
import {fundApi} from "../../services/RTK/fundApi";
import Layout from "../layout/Layout";

const FundListPage = React.memo(() => {

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
                        {data?.map((fund) => (
                            <div key={fund._id}>
                                <Link to={`/funds/${fund._id}`}>{fund.details}</Link>
                            </div>
                        ))}
                    </>
                </div>
            )}
        </Layout>
    );
});

export default FundListPage

