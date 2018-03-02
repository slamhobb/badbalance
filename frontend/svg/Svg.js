'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import check from './check.svg';
import pencil from './pencil.svg';
import trashcan from './trashcan.svg';
import dots from './kebab-horizontal.svg';

function Svg(props) {
    return (
        <span className="octicon"
            dangerouslySetInnerHTML={{__html: props.icon}} />
    );
}

function CheckIcon(props) {
    return (
        <Svg icon={check} />
    );
}

function PencilIcon(props) {
    return (
        <Svg icon={pencil} />
    );
}

function TrashcanIcon(props) {
    return (
        <Svg icon={trashcan} />
    );
}

function Dots() {
    return <Svg icon={dots} />
}

Svg.propTypes = {
    icon: PropTypes.string
};

export { CheckIcon, PencilIcon, TrashcanIcon, Dots };