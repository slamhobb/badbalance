import CoopSpendingType from '../types/CoopSpendingType';
import ICoopSpendingItem from '../types/ICoopSpendingItem';

function validatePayItem(item: ICoopSpendingItem, userIds: number[]) {
    const userCount = userIds.length;

    if (userCount === 2 && item.pays.length != 1) {
        return false;
    }

    if (item.transfers.length > 0) {
        return false;
    }

    for (const pay of item.pays) {
        if (!userIds.includes(pay.userId))
        {
            return false;
        }

        for (const debt of pay.debts) {
            if (!userIds.includes(debt.userId)) {
                return false;
            }
        }
    }

    return true;
}

function validateTransferItem(item: ICoopSpendingItem, userIds: number[]) {
    const userCount = userIds.length;

    if (userCount === 2 && item.transfers.length != 1) {
        return false;
    }

    if (item.pays.length > 0) {
        return false;
    }

    for (const transfer of item.transfers) {
        if (!userIds.includes(transfer.fromUserId)) {
            return false;
        }

        if (!userIds.includes(transfer.toUserId)) {
            return false;
        }
    }

    return true;
}

function validateItems(items: ICoopSpendingItem[], userIds: number[]) {
    const userCount = userIds.length;

    if (userCount === 0) {
        return true;
    }

    if (userCount === 1) {
        return false;
    }

    const notValidItems = items
        .filter(item => item.type === CoopSpendingType.Pay)
        .filter(item => !validatePayItem(item, userIds));
    const notValidTransferItems = items
        .filter(item => item.type === CoopSpendingType.Transfer)
        .filter(item => !validateTransferItem(item, userIds));

    return notValidItems.length === 0 && notValidTransferItems.length === 0;
}

export { validateItems };
