import React, {FC, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import {Search, Sort} from '../../components'
import errorDisplay from "../../utils/errorDisplay";
import {fundApi} from "../../services/RTK/fundApi";
import Layout from "../layout/Layout";
import {billApi} from "../../services/RTK/billApi";
import {FilterList, Title, FundCard} from '../../components'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FundListPage:FC = React.memo(() => {

    const {data: funds, isLoading: fundsLoading, error: fundsError} = fundApi.useFetchAllFundsQuery(null)

    const {data: bills, isLoading: billsLoading, error: billsError} = billApi.useFetchAllBillsQuery(null)

    const loading = billsLoading && fundsLoading
    const error = billsError || fundsError

    useEffect(() => {
        if (error) {
            errorDisplay(error)
        }
    }, [error])

    if (loading) {
        return <h4>Loading...</h4>
    }

    return (
        <Layout>
            {!loading && (
                <Grid container spacing={3}>
                    <Grid item md={9} xs={9}>
                        <Search />
                    </Grid>
                    <Grid item md={3} xs={3}>
                        <Sort />
                    </Grid>
                    {bills?.length && (
                        <Grid item md={3} xs={12}>
                            <FilterList
                                bills={bills!}
                                funds={funds!} />
                        </Grid>
                    )}
                    <Grid item md={9} xs={12}>
                        <Box sx={{ ml: 3 }}>
                            <Title>Детализация</Title>
                            {bills?.length ? (
                                    funds?.length ? (
                                        funds?.map((fund) => (
                                            <Link key={fund._id} to={`/funds/${fund._id}`} >
                                                <FundCard fund={fund}/>
                                            </Link>
                                        ))
                                        ) : (
                                        <Typography variant="h4">По счёту нет ни одной опреации</Typography>
                                    )
                            ) : (
                                <Typography variant="h4">Добавьте первый счёт</Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Layout>
    );
});

export default FundListPage

