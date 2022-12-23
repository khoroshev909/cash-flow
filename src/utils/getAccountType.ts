import {BILL_TYPES} from "../types/models";

const getAccountType = (type: BILL_TYPES) => {
    switch (type) {
        case BILL_TYPES.CARD:
            return 'карта'
        case BILL_TYPES.DEPOSIT:
            return 'депозит'
        case BILL_TYPES.IP:
            return 'ИП'
        case BILL_TYPES.BUSINESS:
            return 'бизнес'
        default:
            return 'счёт'
    }
}

export default getAccountType