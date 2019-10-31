'use strict';

import React from 'react';

export default function Header() {
    return (
        <tr>
            <td>
                <div className="incoming_date text-right">
                    День
                </div>
            </td>
            <td>
                <div className="incoming_sum text-right">
                    Сумма
                </div>
            </td>
            <td>
                <div className="incoming_text">
                    Описание
                </div>
            </td>
            <td>
                <div className="incoming_action">
                    &nbsp;
                </div>
            </td>
        </tr>
    );
}