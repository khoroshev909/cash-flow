export enum BILL_TYPES {
    DEPOSIT = 'DEPOSIT',
    CARD = 'CARD',
    BUSINESS = 'BUSINESS',
    IP = 'IP'
}

export enum CURRENCY_CODE {
    EUR = 'EUR',
    USD = 'USD',
    RUB = 'RUB'
}

export enum COMMENT_TYPE {
    ORIGIN= 'ORIGIN',
    REPLY = 'REPLY'
}

export interface IUser {
    createdAt: number;
    email: string;
    avatar: string;
    password: string;
    updatedAt: number;
    _id: string;
    id: string;
}

export interface IBill {
    createdAt: number;
    type: BILL_TYPES;
    account: string;
    balance: number;
    reviewers: IUser[];
    owner: IUser;
    updatedAt: number;
    currency: CURRENCY_CODE;
    _id: string;
    id: string;
}

export interface IComment {
    createdAt: number;
    fundId: string;
    userId: string;
    body: string;
    type: COMMENT_TYPE;
    upstream: null | string;
    updatedAt: number;
    _id: string;
    id: string;
}

