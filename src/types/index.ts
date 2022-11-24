export interface IFund {
    createdAt: number;
    type: string;
    bill: string;
    amount: string;
    title: string;
    comments: string[];
    reviewers: string[];
    creator: string;
    updatedAt: number;
    _id: string;
    id: string;
}

export interface FundResponse {
    count: number,
    items: IFund[]
}

