import React from 'react';

import CoopSpendingType from '../../types/CoopSpendingType';
import ICoopUser from '../../types/ICoopUser';
import ICoopSpendingItem from '../../types/ICoopSpendingItem';


import CoopSpendingItem from './CoopSpendingItem';
import AddCoopSpendingItemForm from './AddCoopSpendingItemForm';

import {getAvatarImagePath} from '../../services/avatarSelector';

import '../styles.css';


function CoopSpending2User(props: {
    id: number,
    leftUser: ICoopUser,
    rightUser: ICoopUser,
    items: ICoopSpendingItem[],
    onAdd: (item: ICoopSpendingItem) => Promise<number | void>
}) {
    return (
        <React.Fragment>
            <div className="row mt-3 pb-3">

                <div className="col-sm-5">
                    <div className="ava-card">
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

                    <AddCoopSpendingItemForm leftUser={props.leftUser} rightUser={props.rightUser} onAdd={props.onAdd}/>

                    {props.items.map(item => {
                        if (item.type === CoopSpendingType.Pay) {

                            const payData = item.pays[0];
                            const debtData = payData.debts.length == 1
                                ? payData.debts[0]
                                : null;

                            const leftPay = payData.userId === props.leftUser.id;

                            return <CoopSpendingItem
                                key={item.id}
                                name={item.text}
                                type={item.type}
                                paySum={payData.sum}
                                debtSum={debtData?.sum  ?? 0}
                                leftPay={leftPay} />
                        }

                        if (item.type === CoopSpendingType.Transfer) {
                            // TODO:
                        }

                        return null;
                    })}

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
