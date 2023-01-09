import {IBill, IComment, IUser} from "../../types/models";

export enum FUND_TYPES {
    EXSPENSE = 'exspense',
    INCOM = 'incom'
}

export interface IFund {
    createdAt: number;
    type: FUND_TYPES;
    bill: string;
    amount: number;
    balance: number,
    details: string;
    comments: string[];
    reviewers: string[];
    userId: string;
    updatedAt: number;
    _id: string;
    id: string;
}

export interface FundFullInfo {
    loading: boolean,
    fund: IFund | null,
    error: null | string
    creator: IUser | null,
    reviewers: IUser[],
    bill: IBill | null,
    billOwner: IUser | null,
    comments: IComment[],
}

export interface FundFullInfoResponse {
    fund: IFund | null,
    creator: IUser | null,
    reviewers: IUser[],
    bill: IBill | null,
    billOwner: IUser | null,
    comments: IComment[]
}

export interface FundResponse {
    count: number,
    items: IFund[]
}




