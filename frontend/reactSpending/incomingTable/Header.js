'use strict';

import React from 'react';

export default function Header() {
    return (
        <tr>
            <td>
                <div className="incoming_date">
                    День
                </div>
            </td>
            <td>
                <div className="incoming_sum">
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