import CoopSpendingType from './CoopSpendingType';
import ICoopSpendingPay from './ICoopSpendingPay';
import ICoopSpendingTransfer from './ICoopSpendingTransfer';

interface ICoopSpendingItem {
    id: number,
    coopSpendingId: number,
    date: string,
    text: string,
    type: CoopSpendingType,
    pays: ICoopSpendingPay[],
    transfers: ICoopSpendingTransfer[]
}

export default ICoopSpendingItem;
