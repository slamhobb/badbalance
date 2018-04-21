'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import check from './check.svg';
import pencil from './pencil.svg';
import trashcan from './trashcan.svg';
import filter from './settings.svg';

function Svg(props) {
    return (
        <span className="octicon"
            dangerouslySetInnerHTML={{__html: props.icon}} />
    );
}

function CheckIcon() {
    return <Svg icon={check} />;
}

function PencilIcon() {
    return <Svg icon={pencil} />;
}

function TrashcanIcon() {
    return <Svg icon={trashcan} />;
}

function FilterIcon() {
    return <Svg icon={filter} />;
}

Svg.propTypes = {
    icon: PropTypes.string
};

export { CheckIcon, PencilIcon, TrashcanIcon, FilterIcon };