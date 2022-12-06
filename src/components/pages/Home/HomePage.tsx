import React, {FC, useEffect} from 'react';
import {billApi} from "../../../services/RTK/billApi";
import errorDisplay from "../../../utils/errorDisplay";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from "../../layout/Layout";
import {Deposits} from './Deposits';
import {Chart} from './Chart';
import {Orders} from './Orders';

const HomePage:FC = React.memo(() => {

    const {data: bills, isLoading, error, refetch} = billApi.useFetchAllBillsQuery({ limit: 10, page: 1 }, {
        // pollingInterval: 1000
    })

    useEffect(() => {
        if (error) {
            errorDisplay(error)
        }
    }, [error])

    if (isLoading) {
      return <h4>Loading...</h4>
    }

    return (
        <Layout>
          <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Deposits />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Layout>
    );
});

export default HomePage