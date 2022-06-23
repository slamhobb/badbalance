import React, {useEffect, useState} from 'react';

import ICoop from '../types/ICoop';
import ICoopSpendingItem from '../types/ICoopSpendingItem';

import CoopSpending2User from './CoopSpending2User/CoopSpending2User';

import coopSpendingService from '../../services/coopSpendingService';
import { mapCoopFromQuery, mapCoopSpendingItemFromQuery, mapCoopSpendingItemToQuery } from './coopMapper';

import './styles.css';

function CoopSpending(props: {
    coopId: number
}) {
    const [coop, setCoop] = useState<ICoop>(null);
    // TODO: заменить на Map
    const [coopItems, setCoopItems] = useState<ICoopSpendingItem[]>([]);

    useEffect(() => {
        coopSpendingService.getCoopData(props.coopId)
            .then(result => {
                setCoop(mapCoopFromQuery(result.coop));
                setCoopItems(result.items.map(mapCoopSpendingItemFromQuery));
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }, [])

    function createBackUrl(): string {
        const path = window.location.pathname;
        const pathItems = path.split('/');
        pathItems.pop();

        return pathItems.join('/');
    }

    function handleAddCoopSpendingItem(item: ICoopSpendingItem) {
        item.coopSpendingId = coop.id;
        return coopSpendingService.addCoopSpendingItem(mapCoopSpendingItemToQuery(item))
            .then(result => {
                const coopSpendingItemId = result.id;
                item.id = coopSpendingItemId;

                const newCoopItems = coopItems.slice();
                newCoopItems.push(item);
                setCoopItems(newCoopItems);

                return coopSpendingItemId;
            })
            .catch(error => alert('Произошла ошибка ' + error))
    }

    function validateItemsForUsers(items: ICoopSpendingItem[], userIds: number[]) {
        const userCount = userIds.length;

        // если пользователей меньше двух, валидацию не проводим
        if (userCount < 2) {
            return false;
        }

        const notValidItems = items.filter(item => {
            if (userCount === 2 && item.pays.length != 1) {
                return true;
            }

            for (const pay of item.pays) {
                if (!userIds.includes(pay.userId))
                {
                    return true;
                }

                for (const debt of pay.debts) {
                    if (!userIds.includes(debt.userId)) {
                        return true;
                    }
                }
            }
        });

        return notValidItems.length > 0;
    }

    function renderItems() {
        if (coop == null) {
            return (
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        if (coop.users.length === 2) {
            return (
                <CoopSpending2User
                    id={coop.id}
                    leftUser={coop.users[0]}
                    rightUser={coop.users[1]}
                    items={coopItems}
                    onAdd={handleAddCoopSpendingItem}
                />
            );
        }

        return <div>Больше 2 пользователей не поддерживается</div>;
    }

    const userIds = coop?.users.map(u => u.id) ?? [];
    if (validateItemsForUsers(coopItems, userIds)) {
        alert('Не валидные данные');

        return <div>Не валидные данные</div>;
    }

    return (
        <React.Fragment>
            <div className="mt-4 d-flex justify-content-start align-items-center">
                <a href={createBackUrl()} className="btn btn-outline-secondary">&lt;</a>
                <h2 className="mb-0">&nbsp;{coop?.name}</h2>
            </div>
            {renderItems()}
        </React.Fragment>
    );
}

export default CoopSpending;