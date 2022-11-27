import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store";
import {fundByIdSelector, fundSelector} from "../../store/funds/selectors";
import errorDisplay from "../../utils/errorDisplay";
import {fundSetError, fundsLoadingOff, fundsLoadingOn} from "../../store/funds/fundSlice";
import {fundService, billService, userService, commentService} from "../../services";
import {IFund} from "../../store/funds/types";
import {IBill, IComment, IUser} from "../../types/models";

export const FundPage = React.memo(() => {

    const {fundId} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, error } = useAppSelector(fundSelector())
    const currentSelector = useAppSelector(fundByIdSelector(fundId!))
    const [current, setCurrent] = useState<IFund | null>(currentSelector)
    const [bill, setBill] = useState<IBill | null>(null)
    const [owner, setOwner] = useState<IUser | null>(null)
    const [creator, setCreator] = useState<IUser | null>(null)
    const [comments, setComments] = useState<IComment[]>([])
    const [reviewers, setReviewers] = useState<IUser[]>([])


    function setCurrentFund() {
        dispatch(fundsLoadingOn())
        return  new Promise<IFund>(async (resolve, reject) => {
            if (currentSelector) {
                resolve(currentSelector)
            } else {
                const data = await fundService.fetchById(fundId!)
                if (data._id) {
                    setCurrent(data)
                    resolve(data)
                } else {
                    reject(data)
                }
            }
        }).then(async (data) => {
                return Promise.all([
                    await billService.fetchById(data.bill),
                    await userService.fetchById(data.creator),
                    data.reviewers.map(async (userId: string) => await userService.fetchById(userId)),
                    data.comments.map(async (commentId: string) => await commentService.fetchById(commentId))
                ])
            }
        ).then((data) => {
            const users: IUser[] = []
            let ownerId: string | null = null
            data.forEach((item: any) => {
                if (Array.isArray(item)) {
                    item.forEach((res: any) => {
                        if (res.then) {
                            res.then((data: any) => {
                                if (data.avatar) {
                                    users.push(data)
                                    setReviewers(prev => [...prev, data])
                                }
                                if (data.body) {
                                    setComments(prev => [...prev, data])
                                }
                            })
                        }
                    })
                } else {
                    if (item.account) {
                        ownerId = item.owner
                        setBill(item)
                    }
                    if (item.avatar) {
                        users.push(item)
                        setCreator(item)
                    }
                }
            })
            const owner = users.find(u => u._id === ownerId)
            if (owner) setOwner(owner)
        })
        .catch((error) => {
            dispatch(fundSetError(error.message || 'Something went wrong'))
        })
        .finally(() => {
            dispatch(fundsLoadingOff())
        })
    }

    useEffect(() => {
        setCurrentFund()
    }, [])

    useEffect(() => {
        if (error) {
            errorDisplay(error)
        }
    }, [error])

    return (
        <div>
            {loading ? (
                <h4>Loading...</h4>
            ) : (
                <>
                    <button onClick={() => navigate(-1)}>back</button>
                    <h3>Fund: {current?.title}</h3>
                    <p>Creator: {creator?.email}</p>
                    <p>Bill: {bill?.type} account # {bill?.account}</p>
                    <p>Balance: {bill?.balance} {bill?.currency}</p>
                    <p>Account's owner: {owner?.email}</p>
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
        </div>
    );
});

