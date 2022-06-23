import React, {useEffect, useState} from 'react';

import ICoop from '../types/ICoop';
import ICoopSpendingItem from '../types/ICoopSpendingItem';

import { ChevronLeftIcon } from '../../svg/Svg';

import CoopSpending2User from './CoopSpending2User/CoopSpending2User';

import coopSpendingService from '../../services/coopSpendingService';
import { mapCoopFromQuery, mapCoopSpendingItemFromQuery, mapCoopSpendingItemToQuery } from './coopQueryMapper';
import { validateItems } from './itemValidator';

import './styles.css';

function CoopSpending(props: {
    coopId: number
}) {
    const [coop, setCoop] = useState<ICoop>(null);
    const [coopItems, setCoopItems] = useState<Map<number, ICoopSpendingItem>>(new Map<number, ICoopSpendingItem>());

    useEffect(() => {
        coopSpendingService.getCoopData(props.coopId)
            .then(result => {
                setCoop(mapCoopFromQuery(result.coop));

                const items = result.items.map(mapCoopSpendingItemFromQuery);
                setCoopItems(getMap(items));
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }, [])

    function getMap(items: ICoopSpendingItem[]) : Map<number, ICoopSpendingItem> {
        const map = new Map<number, ICoopSpendingItem>();
        items.forEach(x => map.set(x.id, x));
        return map;
    }

    function copyItem(item: ICoopSpendingItem) : ICoopSpendingItem {
        return {
            ...item,
            pays: item.pays.map(pay => ({
                ...pay,
                debts: pay.debts.map(debt => ({ ...debt }))
            })),
            transfers: item.transfers.map(x => ({ ...x }))
        }
    }

    function createBackUrl(): string {
        const path = window.location.pathname;
        const pathItems = path.split('/');
        pathItems.pop();

        return pathItems.join('/');
    }

    function handleAddCoopSpendingItem(item: ICoopSpendingItem) : Promise<void> {
        item.coopSpendingId = coop.id;
        return coopSpendingService.saveCoopSpendingItem(mapCoopSpendingItemToQuery(item))
            .then(result => {
                item.id = result.id;

                const newCoopItems = new Map(coopItems);
                newCoopItems.set(item.id, item);
                setCoopItems(newCoopItems);
            })
            .catch(error => alert('Произошла ошибка ' + error))
    }

    function handleSaveCoopSpendingItem(item: ICoopSpendingItem) : void {
        item.coopSpendingId = coop.id;
        coopSpendingService.saveCoopSpendingItem(mapCoopSpendingItemToQuery(item))
            .then(() => {
                const newCoopItems = new Map(coopItems);
                newCoopItems.set(item.id, item);
                setCoopItems(newCoopItems);
            })
            .catch(error => alert('Произошла ошибка ' + error))
    }

    function handleEditCoopSpendingItem(id: number) : void {
        const newCoopItems = new Map(coopItems);

        const item = newCoopItems.get(id);
        const newItem: ICoopSpendingItem = copyItem(item);
        newItem.edit = true;
        newCoopItems.set(newItem.id, newItem);

        setCoopItems(newCoopItems);
    }

    function handleDeleteCoopSpendingItem(id: number) : void {
        const newCoopItems = new Map(coopItems);

        newCoopItems.delete(id);

        setCoopItems(newCoopItems);
    }

    function renderItems(items: ICoopSpendingItem[]) {
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
                    items={items}
                    onAdd={handleAddCoopSpendingItem}
                    onEdit={handleEditCoopSpendingItem}
                    onSave={handleSaveCoopSpendingItem}
                    onDelete={handleDeleteCoopSpendingItem}
                />
            );
        }

        return <div>Больше 2 пользователей не поддерживается</div>;
    }

    const items = Array.from(coopItems.values());
    const userIds = coop?.users.map(u => u.id) ?? [];
    if (!validateItems(items, userIds)) {
        alert('Не валидные данные');

        return <div>Не валидные данные</div>;
    }

    return (
        <React.Fragment>
            <div className="mt-4 d-flex justify-content-start align-items-center">
                <a href={createBackUrl()} className="btn btn-outline-secondary">
                    <ChevronLeftIcon />
                </a>
                <h2 className="mb-0">&nbsp;{coop?.name}</h2>
            </div>
            {renderItems(items)}
        </React.Fragment>
    );
}

export default CoopSpending;
