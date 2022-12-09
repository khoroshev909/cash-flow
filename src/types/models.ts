export enum BILL_TYPES {
    DEPOSIT = 'DEPOSIT',
    CARD = 'CARD',
    BUSINESS = 'BUSINESS',
    IP = 'IP'
}

export enum BANK_TYPES {
    SBER = 'sber',
    VTB = 'vtb',
    TINKOF = 'tinkof',
    OPEN = 'open'
}

interface IMap {
    [key: string]: string
}

export const banksMap: IMap = {
    sber: 'Сбер',
    vtb: 'ВТБ',
    tinkof: 'Тиньков',
    open: 'Открытие'
}

export const billTypesMap: IMap = {
    card: 'карта',
    deposit: 'депозит',
    business: 'бизнес',
    ip: 'ИП'
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
    username: string,
    email: string;
    avatar: string;
    password: string;
    updatedAt: number;
    _id: string;
    id: string;
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

