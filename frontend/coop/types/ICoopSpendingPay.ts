import ICoopSpendingDebt from './ICoopSpendingDebt';

interface ICoopSpendingPay {
    userId: number,
    sum: number,
    debts: ICoopSpendingDebt[]
}

export default ICoopSpendingPay;
