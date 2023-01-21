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
import localStorageService from "../../services/localStorage.service";
import {IFund} from "../../store/funds/types";

export const CurrentBillContext = createContext<any>({})

const HomePage:FC = React.memo(() => {

    const {data: bills, isLoading: billsLoading, error: billsError} = billApi.useFetchAllBillsQuery(null)

    const [current, setCurrent] = useState<IBill | null>(null)

    const {data: funds, isLoading: fundsLoading, error: fundsError} = fundApi.useFetchAllFundsQuery(null)

    const [filteredFunds, setFilteredFunds] = useState<IFund[]>([])

    const loading = billsLoading && fundsLoading
    const error = billsError || fundsError

    useEffect(() => {
        if (error) {
            errorDisplay(error)
        }
    }, [error])

    useEffect(() => {
      if (bills && bills.length) {
          if (localStorageService.getCurrentBill()) {
              setCurrent(bills.find(bill => bill._id === localStorageService.getCurrentBill()) || bills[0])
          } else {
              setCurrent(bills[0])
          }
      }
    }, [bills])

    useEffect(() => {
        if (current) {
            localStorageService.setCurrentBill(current._id)
            if (funds?.length) {
                setFilteredFunds(funds.filter(item => item.bill === current._id) || [])
            }
        }
    }, [current, funds])

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
                    <Chart funds={take(filteredFunds, 15)} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <FundList funds={takeRight(filteredFunds, 5)} />
                </Paper>
              </Grid>
            </CurrentBillContext.Provider>            
          </Grid>
        </Layout>
    );
});

export default HomePage