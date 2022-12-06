import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import errorDisplay from "../../utils/errorDisplay";
import {useAppSelector} from "../../store";
import {useActions} from "../../hooks/useActions";
import {fundApi} from "../../services/RTK/fundApi";
import Layout from "../layout/Layout";

const FundPage = React.memo(() => {

    const navigate = useNavigate()
    const {fundId} = useParams()
    const { getFundFullInfo } = useActions()

    const {currentSelector, error: queryError, isLoading} = fundApi.useFetchAllFundsQuery(null, {
        selectFromResult: ({ data, error, isLoading }) => ({
            currentSelector: data?.items.find((fund) => fund._id === fundId),
            error,
            isLoading
        })
    })

    const {
        loading,
        error: actionError,
        fund,
        creator,
        reviewers,
        bill,
        billOwner,
        comments,
    } = useAppSelector(state => state.currentFund)

    useEffect(() => {
        if (currentSelector && fund?._id !== fundId) {
            getFundFullInfo(currentSelector)
        }
    }, [currentSelector, fundId])

    useEffect(() => {
        if (queryError || actionError) {
            errorDisplay(queryError || actionError)
        }
    }, [queryError, actionError])

    return (
        <Layout>
            {loading ? (
                <h4>Loading...</h4>
            ) : (
                <>
                    <button onClick={() => navigate(-1)}>back</button>
                    <h3>Fund: {fund?.title}</h3>
                    <p>Creator: {creator?.email}</p>
                    <p>Bill: {bill?.type} account # {bill?.account}</p>
                    <p>Balance: {bill?.balance} {bill?.currency}</p>
                    <p>Account's owner: {billOwner?.email}</p>
                    <div>
                        <h4>Reviewers:</h4>
                        {reviewers.map((u) => (
                            <p key={u._id}>{u.email}</p>
                        ))}
                    </div>
                    <div>
                        <h4>Comments:</h4>
                        {comments.map((c) => (
                            <p key={c._id}>{c.body}</p>
                        ))}
                    </div>
                </>
            )}
        </Layout>
    );
});

export default FundPage

