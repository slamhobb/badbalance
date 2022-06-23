import React, {ReactElement} from 'react';

import CoopSpendingType from '../../types/CoopSpendingType';

function CoopSpendingItem(props: {
    id: number,
    name: string,
    type: CoopSpendingType
    paySum: number,
    debtSum: number,
    transferSum: number,
    leftUser: boolean,
    onEdit: (id: number) => void
}) {
    function emptyIfZero(sum: number): string {
        return sum === 0
            ? ''
            : `${sum}`;
    }

    function handleEdit(e: React.MouseEvent) {
        e.preventDefault();

        props.onEdit(props.id);
    }

    function getBadgeText() {
        if (props.type === CoopSpendingType.Pay) {
            if (props.debtSum === 0) {
                return '1';
            }

            return props.leftUser
                ? '< долг'
                : 'долг >';
        }

        if (props.type === CoopSpendingType.Transfer) {
            return props.leftUser
                ? 'перевод >'
                : '< перевод';
        }

        return '';
    }

    let upSum : string = '';
    let leftSum : ReactElement;
    let rightSum : ReactElement;

    if (props.type === CoopSpendingType.Pay) {
        const mainSum = props.paySum - props.debtSum;

        upSum = `${props.paySum}`;
        leftSum = props.leftUser
            ? <span>{mainSum}</span>
            : <span className="text-muted">{emptyIfZero(props.debtSum)}</span>;
        rightSum = props.leftUser
            ? <span className="text-muted">{emptyIfZero(props.debtSum)}</span>
            : <span>{mainSum}</span>;
    }

    if (props.type === CoopSpendingType.Transfer) {
        leftSum = props.leftUser
            ? <span>{props.transferSum}</span>
            : null;
        rightSum = props.leftUser
            ? null
            : <span>{props.transferSum}</span>;
    }

    return (
        <a href="#" className="list-group-item list-group-item-action py-2" onClick={handleEdit}>
            <h4 className="font-weight-bold text-center">{upSum}</h4>
            <h5 className="text-center">{props.name}</h5>

            <div className="row no-gutters">
                <div className="col text-right">
                    {leftSum}
                </div>
                <div className="col text-center">
                    <span className="badge badge-secondary">
                        {getBadgeText()}
                    </span>
                </div>
                <div className="col">
                    {rightSum}
                </div>
            </div>
        </a>
    );
}

export default CoopSpendingItem;
