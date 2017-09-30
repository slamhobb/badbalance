'use strict';

import React from 'react';

export default function Header() {
    return (
        <tr>
            <td>
                <div className="spending_date">
                    День
                </div>
            </td>
            <td>
                <div className="spending_sum">
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