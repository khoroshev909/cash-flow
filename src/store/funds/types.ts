import {IBill, IComment, IUser} from "../../types/models";

export enum FUND_TYPES {
    EXSPENSE = 'EXSPENSE',
    INCOM = 'INCOM'
}

export interface IFund {
    createdAt: number;
    type: FUND_TYPES;
    bill: string;
    amount: number;
    title: string;
    comments: string[];
    reviewers: string[];
    creator: string;
    updatedAt: number;
    _id: string;
    id: string;
}

export interface IFundExtended {
    createdAt: number;
    type: FUND_TYPES;
    bill: IBill;
    amount: number;
    title: string;
    comments: IComment[];
    reviewers: IUser[];
    creator: IUser;
    updatedAt: number;
    _id: string;
    id: string;
}

export interface FundResponse {
    count: number,
    items: IFund[]
}


