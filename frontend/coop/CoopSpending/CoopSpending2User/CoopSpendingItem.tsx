import React from 'react';

import CoopSpendingType from '../../types/CoopSpendingType';

function CoopSpendingItem(props: {
    name: string,
    type: CoopSpendingType
    paySum: number,
    debtSum: number,
    leftPay: boolean
}) {
    function getBadgeText() {
        if (props.type === CoopSpendingType.Pay) {
            if (props.debtSum === 0) {
                return '1';
            }

            return props.leftPay
                ? '< долг'
                : 'долг >';
        }

        if (props.type === CoopSpendingType.Transfer) {
            return props.leftPay
                ? 'перевод >'
                : '< перевод';
        }

        return '';
    }

    const mainSum = props.paySum - props.debtSum;

    const leftSum = props.leftPay ? mainSum : props.debtSum;
    const rightSum = props.leftPay ? props.debtSum : mainSum;

    return (
        <div className="card mt-3">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <h4 className="font-weight-bold text-center">{props.paySum}</h4>
                    <h5 className="text-center">{props.name}</h5>
                    <div className="row no-gutters">
                        <div className="col text-right">
                            {leftSum}
                        </div>
                        <div className="col text-center ">
                            <span className="badge badge-secondary">
                                {getBadgeText()}
                            </span>
                        </div>
                        <div className="col">
                            {rightSum}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default CoopSpendingItem;