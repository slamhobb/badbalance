import React from 'react';

import CoopSpendingType from '../../types/CoopSpendingType';
import ICoopUser from '../../types/ICoopUser';
import ICoopSpendingItem from '../../types/ICoopSpendingItem';

import AddCoopSpendingItemForm, { AddStateType } from './AddCoopSpendingItemForm';
import CoopSpendingItem from './CoopSpendingItem';

import { getAvatarImagePath } from '../../services/avatarSelector';
import { groupBy } from '../../../tools/dataTools';
import { formatDate } from '../../../tools/dateTools';

import '../styles.css';


function CoopSpending2User(props: {
    id: number,
    leftUser: ICoopUser,
    rightUser: ICoopUser,
    items: ICoopSpendingItem[],
    onAdd: (item: ICoopSpendingItem) => Promise<void>,
    onEdit: (id: number) => void,
    onSave: (item: ICoopSpendingItem) => void,
    onDelete: (id: number) => void
}) {
    function renderItem(item: ICoopSpendingItem) {
        const payData = item.pays[0];
        const debtData = payData?.debts[0];
        const transferData = item.transfers[0];

        const leftUser = payData?.userId === props.leftUser.id ||
            transferData?.fromUserId === props.leftUser.id;

        if (item.edit) {
            if (item.type === CoopSpendingType.Pay)
            {
                return <AddCoopSpendingItemForm
                    key={item.id}
                    id={item.id}
                    state={leftUser ? AddStateType.LEFT_ADD_PAY : AddStateType.RIGHT_ADD_PAY}
                    date={item.date}
                    paySum={payData.sum}
                    debtSum={debtData.sum}
                    text={item.text}
                    edit={true}
                    leftUser={props.leftUser}
                    rightUser={props.rightUser}
                    onAdd={() => new Promise(null)}
                    onSave={props.onSave}
                    onDelete={props.onDelete}
                    />;
            }

            if (item.type === CoopSpendingType.Transfer) {
                return <AddCoopSpendingItemForm
                    key={item.id}
                    id={item.id}
                    state={leftUser ? AddStateType.LEFT_ADD_TRANSFER : AddStateType.RIGHT_ADD_TRANSFER}
                    date={item.date}
                    paySum={transferData.sum}
                    debtSum={0}
                    text={item.text}
                    edit={true}
                    leftUser={props.leftUser}
                    rightUser={props.rightUser}
                    onAdd={() => new Promise(null)}
                    onSave={props.onSave}
                    onDelete={props.onDelete}
                    />;
            }

            return null;
        }

        return <CoopSpendingItem
            key={item.id}
            id={item.id}
            name={item.text}
            type={item.type}
            paySum={payData?.sum ?? 0}
            debtSum={debtData?.sum ?? 0}
            transferSum={item.transfers[0]?.sum ?? 0}
            leftUser={leftUser}
            onEdit={props.onEdit} />
    }

    const items = props.items.slice();
    items.sort((a, b) => {
        const diff = new Date(b.date).getTime() - new Date(a.date).getTime();

        return diff === 0 ? b.id - a.id : diff;
    });

    const g = groupBy(items, 'date');

    const listItems = g.map((x : ICoopSpendingItem[]) => {
        return (
            <div key={x[0].id} className="mt-3">
                <h5 className="text-muted">{formatDate(x[0].date)}</h5>
                <div className="list-group mt-1">
                    { x.map(x => renderItem(x))}
                </div>
            </div>
        );
    });

    return (
        <React.Fragment>
            <div className="row mt-3 pb-3">

                <div className="col-sm-5">

                    <div className="ava-card mb-3">
                        <div className="row no-gutters">
                            <div className="col text-right">
                                <img src={getAvatarImagePath(props.leftUser.avatar)} className="rounded" alt="avatar" />
                                <h5>{props.leftUser.name}</h5>
                            </div>
                            <div className="col d-flex justify-content-center align-items-center">
                                vs
                            </div>
                            <div className="col">
                                <img src={getAvatarImagePath(props.rightUser.avatar)} className="rounded" alt="avatar" />
                                <h5>{props.rightUser.name}</h5>
                            </div>
                        </div>
                    </div>

                    <AddCoopSpendingItemForm
                        leftUser={props.leftUser}
                        rightUser={props.rightUser}
                        onAdd={props.onAdd}
                        onSave={() => {}}
                        onDelete={() => {}}/>

                    {listItems}

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">1800</h4>
                                <h5 className="text-center">Обед на высоте </h5>
                                <div className="row no-gutters">
                                    <div className="col text-right text-muted">
                                        1200
                                    </div>
                                    <div className="col text-center ">
                                        <span className="badge badge-secondary">&lt; долг</span>
                                    </div>
                                    <div className="col">
                                        600
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">300</h4>
                                <h5 className="text-center">Хот-дог</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right text-muted">
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">150 &gt;</span>
                                    </div>
                                    <div className="col">
                                        300
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">2000</h4>
                                <h5 className="text-center">Скипасс</h5>
                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        500
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">500 &gt;</span>
                                    </div>
                                    <div className="col">
                                        1500
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">3000</h4>
                                <h5 className="text-center">Такси до Домбая</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        1500
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">=</span>
                                    </div>
                                    <div className="col">
                                        1500
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">350</h4>
                                <h5 className="text-center">Чай на горе</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        100
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">=</span>
                                    </div>
                                    <div className="col">
                                        250
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4 className="font-weight-bold text-center">120</h4>
                                <h5 className="text-center">Сушеный банан</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        120
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">1</span>
                                    </div>
                                    <div className="col">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h5 className="text-center">Одал за кафе</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        120
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">перевод &gt;</span>
                                    </div>
                                    <div className="col">
                                        +120
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h5 className="text-center">За орехи</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                        +500
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">&lt; перевод</span>
                                    </div>
                                    <div className="col">
                                        500
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h5 className="text-center">За орехи</h5>

                                <div className="row no-gutters">
                                    <div className="col text-right">
                                    </div>
                                    <div className="col text-center">
                                        <span className="badge badge-secondary">&lt; перевод</span>
                                    </div>
                                    <div className="col">
                                        500
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </React.Fragment>
    );
}

export default CoopSpending2User;
