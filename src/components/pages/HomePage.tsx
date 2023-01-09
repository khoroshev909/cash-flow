import React, {FC, useEffect, useState, createContext} from 'react';
import {billApi} from "../../services/RTK/billApi";
import { fundApi } from '../../services/RTK/fundApi';
import errorDisplay from "../../utils/errorDisplay";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from "../layout/Layout";
import {Bills, Chart, FundList} from '../../components';
import {IBill} from '../../types/models';
import {take, takeRight} from 'lodash'

export const CurrentBillContext = createContext<any>({})

const HomePage:FC = React.memo(() => {

    const {data: bills, isLoading: billsLoading, error: billsError} = billApi.useFetchAllBillsQuery(null)
    const {data: funds, isLoading: fundsLoading, error: fundsError} = fundApi.useFetchAllFundsQuery(null)

    const loading = billsLoading && fundsLoading
    const error = billsError || fundsError

    const [current, setCurrent] = useState<IBill | null>(null)

    useEffect(() => {
        if (error) {
            errorDisplay(error)
        }
    }, [error])

    useEffect(() => {
      if (bills && bills.length) {
        setCurrent(bills[0])
      }
    }, [bills])

    if (loading) {
      return <h4>Loading...</h4>
    }

    return (
        <Layout>
          <Grid container spacing={3}>
            <CurrentBillContext.Provider value={{ current, setCurrent }}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Bills data={bills || []} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}>
                    <Chart funds={take(funds, 15)} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <FundList funds={takeRight(funds, 5)} />
                </Paper>
              </Grid>
            </CurrentBillContext.Provider>            
          </Grid>
        </Layout>
    );
});

export default HomePage