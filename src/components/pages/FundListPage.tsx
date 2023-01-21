import React, {FC, useEffect, useMemo, useState, useCallback} from 'react';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import {Search, Sort} from '../../components'
import errorDisplay from "../../utils/errorDisplay";
import {fundApi} from "../../services/RTK/fundApi";
import Layout from "../layout/Layout";
import {billApi} from "../../services/RTK/billApi";
import {FilterList, Title, FundCard} from '../../components'
import Box from "@mui/material/Box";
import {IFund} from "../../store/funds/types";

interface IFilters { accounts: null | string[], banks: null | string[], accountTypes: null | string[] }

const FundListPage:FC = React.memo(() => {

    const {data: bills, isLoading: billsLoading, error: billsError} = billApi.useFetchAllBillsQuery(null)

    const {data: funds, isLoading: fundsLoading, error: fundsError} = fundApi.useFetchAllFundsQuery(null)

    const banksList =  useMemo(() => Array.from(new Set(bills?.map(bill => bill.bank))), [bills])

    const accountTypesList =  useMemo(() => Array.from(new Set(bills?.map(bill => bill.type))), [bills])

    const [filteredFunds, setFilteredFunds] = useState<IFund[] | undefined>(funds)

    const [filters, setFilters]  = useState<IFilters>({
        accounts: null,
        banks: null,
        accountTypes: null
    })

    const [isFiltered, setIsFiltered] = useState<boolean>(false)

    useEffect(() => {
        const isActive = Object.values(filters).find(item => item !== null)
        if (isActive) {
            setIsFiltered(true)
        } else {
            setIsFiltered(false)
        }
    }, [filters])

    const getFilteredData = useMemo(() => {
        return funds?.filter(item => filters.accounts ? filters.accounts.includes(item.bill) : item)
            .filter(item => filters.banks ? filters.banks.includes(item._id) : item)
            .filter(item => filters.accountTypes ? filters.accountTypes.includes(item._id) : item)
    }, [funds, filters])

    useEffect(() => {
        if (funds?.length) {
            if (!isFiltered) {
                setFilteredFunds(funds)
            } else {
                setFilteredFunds(getFilteredData)
            }
        }
    }, [funds, filters, isFiltered])

    const accountFilterHandler = useCallback((filtered: string[]) => {
        const isActive = filtered.length !== bills?.length
        if (isActive) {
            setFilters(prev => ({...prev, accounts: filtered}))
        }  else {
            setFilters(prev => ({...prev, accounts: null}))
        }
    }, [bills])

    const banksFilterHandler = useCallback( (filtered: string[]) => {
        const isActive = filtered.length !== banksList?.length
        if (isActive) {
            const filteredBills = bills?.filter(bill => filtered.includes(bill.bank)).map(item => item._id)
            const filteredBanks = funds?.filter(fund => filteredBills?.includes(fund.bill)).map(item => item._id)
            if (filteredBanks) {
                setFilters(prev => ({...prev,  banks: filteredBanks}))
            }
        }  else {
            setFilters(prev => ({...prev, banks: null}))
        }
    }, [banksList, bills, funds])

    const accountTypesFilterHandler = useCallback((filtered: string[]) => {
        const isActive = accountTypesList.length !== filtered.length
        if (isActive) {
            const filteredBills = bills?.filter(bill => filtered.includes(bill.type)).map(item => item._id)
            const filteredAccountTypes = funds?.filter(fund => filteredBills?.includes(fund.bill)).map(item => item._id)
            if (filteredAccountTypes) {
                setFilters(prev => ({...prev,  accountTypes: filteredAccountTypes}))
            }
        } else {
            setFilters(prev => ({...prev, accountTypes: null}))
        }
    }, [accountTypesList, bills, funds])

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
                                onFilterAccount={accountFilterHandler}
                                onFilterBanks={banksFilterHandler}
                                onFilterAccountTypes={accountTypesFilterHandler}
                                banks={banksList}
                                bills={bills!}
                                funds={funds!} />
                        </Grid>
                    )}
                    <Grid item md={6} xs={12}>
                        <Box sx={{ marginLeft: 3 }}>
                            <Title>Детализация</Title>
                            {bills?.length ? (
                                filteredFunds?.length ? (
                                    filteredFunds?.map((fund) => (
                                            <Link key={fund._id} to={`/funds/${fund._id}`} >
                                                <FundCard fund={fund}/>
                                            </Link>
                                        ))
                                        ) : (
                                            <Title>По счёту нет ни одной опреации</Title>
                                        )
                            ) : (
                                <Title>Добавьте первый счёт</Title>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Layout>
    );
});

export default FundListPage

