import React, {FC, useEffect} from 'react';
import {billApi} from "../../services/RTK/billApi";
import errorDisplay from "../../utils/errorDisplay";
import Layout from "../layouts/Layout";


export const HomePage:FC = React.memo(() => {

    const {data: bills, isLoading, error, refetch} = billApi.useFetchAllBillsQuery({ limit: 10, page: 1 }, {
        // pollingInterval: 1000
    })

    useEffect(() => {
        if (error) {
            errorDisplay(error)
        }
    }, [error])

    return (
        <Layout>
            <h4>Home</h4>
        </Layout>
    );
});

