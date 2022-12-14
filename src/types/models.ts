import {keys} from "lodash";

export enum BILL_TYPES {
    DEPOSIT = 'DEPOSIT',
    CARD = 'CARD',
    BUSINESS = 'BUSINESS',
    IP = 'IP'
}
export const billTypesMap = {
    CARD: 'карта',
    DEPOSIT: 'депозит',
    BUSINESS: 'бизнес',
    IP: 'ИП'
}

export enum SORT_FUNDS {
    CREATED_DESC = 'created_desc',
    CREATED_ASC = 'created_asc',
    AMOUNT_DESC = 'amount_desc',
    AMOUNT_ASC = 'amount_asc',
}

export interface SortItem {
    label: string,
    value: SORT_FUNDS
}

export enum BANK_TYPES {
    SBER = 'sber',
    VTB = 'vtb',
    TINKOF = 'tinkof',
    OPEN = 'open'
}

export interface IMap {
    [key: string]: string
}

export type bankTypes = {
    sber: string,
    vtb: string,
    tinkof: string,
    open: string
}

export const banksMap: bankTypes = {
    sber: 'Сбер',
    vtb: 'ВТБ',
    tinkof: 'Тиньков',
    open: 'Открытие'
}

// export type billTypes = {
//     card: string,
//     deposit: string,
//     business: string,
//     ip: string
// }

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
    username: string,
    email: string;
    avatar: string;
    updatedAt: number;
    _id: string;
}

export interface UserData {
    _id: string,
    email: string,
    avatar: string,
    username: string
}

export interface IBill {
    createdAt: number;
    type: BILL_TYPES;
    bank: BANK_TYPES,
    account: string;
    balance: number;
    reviewers: string[];
    userId: string;
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

export interface QueryError {
    code: number,
    data: string
}

