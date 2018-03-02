'use strict';

import React from 'react';

import { Dots } from '../../svg/Svg';

export default function Header() {
    return (
        <tr>
            <td>
                <div className="spending_date text-right">
                    День
                </div>
            </td>
            <td>
                <div className="spending_sum text-right">
                    Сумма
                </div>
            </td>
            <td>
                <div className="spending_text">
                    Описание
                </div>
            </td>
            <td>
                <div className="spending_category">
                    Категория
                </div>
            </td>
            <td>
                <div className="spending_action">
                    &nbsp;
                </div>
            </td>
        </tr>
    );
}