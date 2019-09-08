'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import check from './check.svg';
import pencil from './pencil.svg';
import trashcan from './trashcan.svg';
import filter from './settings.svg';
import chevronRight from './chevron-right.svg';
import chevronDown from './chevron-down.svg';
import income from './income.svg';
import outcome from './outcome.svg';

function Svg(props) {
    const {icon, className, ...rest} = props;

    const cl = ["octicon", className].join(" ");

    return (
        <span className={cl} {...rest}
            dangerouslySetInnerHTML={{__html: icon}} />
    );
}

function CheckIcon(props) {
    return <Svg icon={check} {...props} />;
}

function PencilIcon(props) {
    return <Svg icon={pencil} {...props} />;
}

function TrashcanIcon(props) {
    return <Svg icon={trashcan} {...props} />;
}

function FilterIcon(props) {
    return <Svg icon={filter} {...props} />;
}

function ChevronRightIcon(props) {
    return <Svg icon={chevronRight} {...props} />;
}

function ChevronDownIcon(props) {
    return <Svg icon={chevronDown} {...props} />;
}

function IncomeIcon(props) {
    return <Svg icon={income} {...props} />;
}

function OutcomeIcon(props) {
    return <Svg icon={outcome} {...props} />;
}

Svg.propTypes = {
    icon: PropTypes.string.isRequired
};

export { CheckIcon, PencilIcon, TrashcanIcon, FilterIcon,
    ChevronRightIcon, ChevronDownIcon, IncomeIcon, OutcomeIcon };