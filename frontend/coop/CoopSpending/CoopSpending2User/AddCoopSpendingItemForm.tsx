import React, { useState } from 'react';

import CoopSpendingType from '../../types/CoopSpendingType';
import ICoopSpendingDebt from '../../types/ICoopSpendingDebt';
import ICoopSpendingPay from '../../types/ICoopSpendingPay';
import ICoopSpendingTransfer from '../../types/ICoopSpendingTransfer';
import ICoopSpendingItem from '../../types/ICoopSpendingItem';

import ReactDatePicker from '../../../datepicker/index';

import { dateToString } from '../../../tools/dateTools';

import { CheckIcon } from '../../../svg/Svg';

enum AddStateType {
    INIT,
    LEFT_ADD_PAY,
    RIGHT_ADD_PAY,
    LEFT_ADD_TRANSFER,
    RIGHT_ADD_TRANSFER
}

const curDate = dateToString(new Date());

AddCoopSpendingItemForm.defaultProps = {
    id: 0,
    state: AddStateType.INIT,
    date: curDate,
    paySum: 0,
    debtSum: 0,
    text: '',

    edit: false
};

function AddCoopSpendingItemForm(props: {
    id: number,
    state: AddStateType,
    date: string,
    paySum: number,
    debtSum: number,
    text: string,

    edit: boolean,

    leftUser: {
        id: number,
        name: string,
    },
    rightUser: {
        id: number,
        name: string
    },
    onAdd: (item: ICoopSpendingItem) => Promise<void>,
    onSave: (item: ICoopSpendingItem) => void,
    onDelete: (id: number) => void,
}) {
    const [addState, setAddState] = useState<AddStateType>(props.state);

    const [date, setDate] = useState<string>(props.date);
    const [paySum, setPaySum] = useState<number>(props.paySum);
    const [debtSum, setDebtSum] = useState<number>(props.debtSum);
    const [text, setText] = useState<string>(props.text);

    function addPay() : ICoopSpendingItem {
        const payUserId = addState === AddStateType.LEFT_ADD_PAY
            ? props.leftUser.id
            : props.rightUser.id;

        const debtUserId = addState === AddStateType.LEFT_ADD_PAY
            ? props.rightUser.id
            : props.leftUser.id;

        const debt: ICoopSpendingDebt = {
            userId: debtUserId,
            sum: debtSum
        };

        const pay: ICoopSpendingPay = {
            userId: payUserId,
            sum: paySum,
            debts: debtSum > 0 ? [debt] : []
        }

        return {
            id: 0,
            coopSpendingId: 0,
            date: date,
            text: text,
            type: CoopSpendingType.Pay,
            pays: [
                pay
            ],
            transfers: []
        };
    }

    function addTransfer() : ICoopSpendingItem {
        const fromUserId = addState === AddStateType.LEFT_ADD_TRANSFER
            ? props.leftUser.id
            : props.rightUser.id;

        const toUserId = addState === AddStateType.LEFT_ADD_TRANSFER
            ? props.rightUser.id
            : props.leftUser.id;

        const transfer : ICoopSpendingTransfer = {
            fromUserId: fromUserId,
            toUserId: toUserId,
            sum: paySum
        };

        return {
            id: 0,
            coopSpendingId: 0,
            date: date,
            text: text,
            type: CoopSpendingType.Transfer,
            pays: [],
            transfers: [
                transfer
            ]
        };
    }

    function emptyIfZero(sum: number): string {
        return sum === 0
            ? ''
            : `${sum}`;
    }

    function handleLeftAddPay() {
        setAddState(AddStateType.LEFT_ADD_PAY);
    }

    function handleRightAddPay() {
        setAddState(AddStateType.RIGHT_ADD_PAY);
    }

    function handleLeftAddTransfer() {
        setAddState(AddStateType.LEFT_ADD_TRANSFER);
    }

    function handleRightAddTransfer() {
        setAddState(AddStateType.RIGHT_ADD_TRANSFER);
    }

    function handleChangeDate(date: string) {
        setDate(date);
    }

    function handleChangePaySum(e: any) {
        const sum = parseInt(e.target.value);
        setPaySum(isNaN(sum) ? 0 : sum);
    }

    function handleChangeDebtSum(e: any) {
        const sum = parseInt(e.target.value);
        setDebtSum(isNaN(sum) ? 0 : sum);
    }

    function handleEqually() {
        setDebtSum(Math.floor(paySum / 2));
    }

    function handleOnlyOne() {
        setDebtSum(0);
    }

    function handleChangeText(e: any) {
        setText(e.target.value);
    }

    function handleCloseForm() {
        if (props.edit) {
            const confirmDelete = confirm('Вы действительно хотите удалить запись?');
            if (!confirmDelete) {
                return;
            }

            props.onDelete(props.id);

            return;
        }

        setAddState(AddStateType.INIT);
    }

    function handleAdd() {
        let item : ICoopSpendingItem = null;

        if (addState === AddStateType.LEFT_ADD_PAY ||
            addState === AddStateType.RIGHT_ADD_PAY) {
            item = addPay();
        }

        if (addState === AddStateType.LEFT_ADD_TRANSFER ||
            addState === AddStateType.RIGHT_ADD_TRANSFER) {
            item = addTransfer();
        }

        if (props.edit && item) {
            item.id = props.id;
            props.onSave(item);

            return;
        }

        item && props.onAdd(item)
            .then(() => {
                setAddState(AddStateType.INIT);
                setPaySum(0);
                setDebtSum(0);
                setText('');
            });
    }

    function renderAdderName(): string {
        if (addState === AddStateType.LEFT_ADD_PAY || addState === AddStateType.LEFT_ADD_TRANSFER) {
            return props.leftUser.name;
        }

        if (addState == AddStateType.RIGHT_ADD_PAY || addState === AddStateType.RIGHT_ADD_TRANSFER) {
            return props.rightUser.name;
        }

        return '';
    }

    function renderInitForm() {
        return (
            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="row no-gutters">
                            <div className="col">
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-outline-secondary" onClick={handleLeftAddTransfer}>
                                        =&gt;
                                    </button>
                                    <button className="btn btn-outline-secondary" onClick={handleLeftAddPay}>
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="col">&nbsp;</div>
                            <div className="col">
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-outline-secondary" onClick={handleRightAddTransfer}>
                                        &lt;=
                                    </button>
                                    <button className="btn btn-outline-secondary" onClick={handleRightAddPay}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

    function renderPayForm() {
        const mainSum = debtSum > paySum
            ? 0
            : paySum - debtSum;

        return (
            <div className="card p-2">
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <div>{renderAdderName()}</div>

                    <ReactDatePicker className="form-control ml-2" placeholder="Дата"
                        defaultValue={curDate} onChange={handleChangeDate}/>

                    <input type="number" className="form-control ml-2" placeholder="Сумма оплаты"
                        value={emptyIfZero(paySum)} onChange={handleChangePaySum}/>

                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleCloseForm}>
                        &times;
                    </button>
                </div>
                <div className="input-group mb-2">
                    <input type="number" className="form-control" placeholder="Сумма за себя"
                        value={emptyIfZero(mainSum)} onChange={() => {}} readOnly={true} />
                    <input type="number" className="form-control" placeholder="Сумма долга"
                        value={emptyIfZero(debtSum)} onChange={handleChangeDebtSum}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={handleEqually}>
                            /
                        </button>
                        <button className="btn btn-outline-secondary" onClick={handleOnlyOne}>
                            1
                        </button>
                    </div>
                </div>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Название"
                        value={text} onChange={handleChangeText} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={handleAdd}>
                            <CheckIcon />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function renderTransferForm() {
        return (
            <div className="card p-2">
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <div>{renderAdderName()}</div>

                    <ReactDatePicker className="form-control ml-2" placeholder="Дата"
                        defaultValue={curDate} onChange={handleChangeDate}/>

                    <input type="number" className="form-control ml-2" placeholder="Сумма перевода"
                        value={emptyIfZero(paySum)} onChange={handleChangePaySum}/>

                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleCloseForm}>
                        &times;
                    </button>
                </div>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Название"
                        value={text} onChange={handleChangeText} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={handleAdd}>
                            <CheckIcon />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (addState === AddStateType.INIT) {
        return renderInitForm();
    }

    if (addState === AddStateType.LEFT_ADD_PAY || addState === AddStateType.RIGHT_ADD_PAY) {
        return renderPayForm();
    }

    if (addState === AddStateType.LEFT_ADD_TRANSFER || addState === AddStateType.RIGHT_ADD_TRANSFER) {
        return renderTransferForm();
    }

    return null;
}

export default AddCoopSpendingItemForm;
export { AddStateType };
