import ICoop from '../types/ICoop';
import ICoopUser from '../types/ICoopUser';
import CoopSpendingType from '../types/CoopSpendingType';
import ICoopSpendingDebt from '../types/ICoopSpendingDebt';
import ICoopSpendingPay from '../types/ICoopSpendingPay';
import ICoopSpendingTransfer from '../types/ICoopSpendingTransfer';
import ICoopSpendingItem from '../types/ICoopSpendingItem';

function mapCoopFromQuery(coop: any) : ICoop {
    function mapUser(user: any) : ICoopUser {
        return {
            id: user.id as number,
            name: user.name as string,
            avatar: user.avatar as string
        };
    }

    return {
        id: coop.id as number,
        name: coop.name as string,
        users: coop.users.map(mapUser)
    }
}

function mapCoopSpendingItemFromQuery(item: any) : ICoopSpendingItem {
    function mapType(type: any) : CoopSpendingType {
        if (type === 'pay') {
            return CoopSpendingType.Pay;
        }

        if (type === 'transfer') {
            return CoopSpendingType.Transfer;
        }

        throw new Error(`Unsupported CoopSpendingType = ${type}`);
    }

    function mapDebt(debt: any) : ICoopSpendingDebt {
        return {
            userId: debt.user_id as number,
            sum: debt.sum as number
        };
    }

    function mapPay(pay: any) : ICoopSpendingPay {
        return {
            userId: pay.user_id as number,
            sum: pay.sum as number,
            debts: pay.debts.map(mapDebt)
        };
    }

    function mapTransfer(transfer: any) : ICoopSpendingTransfer {
        return {
            fromUserId: transfer.from_user_id as number,
            toUserId: transfer.to_user_id as number,
            sum: transfer.sum as number
        };
    }

    return {
        id: item.id as number,
        coopSpendingId: item.coop_spending_id as number,
        date: item.date as string,
        text: item.text as string,
        type: mapType(item.type as string),
        pays: item.pays.map(mapPay),
        transfers: item.transfers.map(mapTransfer)
    };
}

function mapCoopSpendingItemToQuery(item: ICoopSpendingItem) : object {
    function mapType(type: CoopSpendingType) : string {
        if (type === CoopSpendingType.Pay) {
            return 'pay';
        }

        if (type === CoopSpendingType.Transfer) {
            return 'transfer';
        }

        throw new Error(`Unsupported CoopSpendingType = ${type}`);
    }

    function mapDebt(debt: ICoopSpendingDebt) : object {
        return {
            user_id: debt.userId,
            sum: debt.sum
        };
    }

    function mapPay(pay: ICoopSpendingPay) : object {
        return {
            user_id: pay.userId,
            sum: pay.sum,
            debts: pay.debts.map(mapDebt)
        };
    }

    function mapTransfer(transfer: ICoopSpendingTransfer) : object {
        return {
            from_user_id: transfer.fromUserId,
            to_user_id: transfer.toUserId,
            sum: transfer.sum
        };
    }

    return {
        id: item.id,
        coop_spending_id: item.coopSpendingId,
        date: item.date,
        text: item.text,
        type: mapType(item.type),
        pays: item.pays.map(mapPay),
        transfers: item.transfers.map(mapTransfer)
    };
}

export { mapCoopFromQuery, mapCoopSpendingItemFromQuery, mapCoopSpendingItemToQuery };
