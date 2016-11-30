'use strict';

import Flatpickr from './flatpickr';
import l10ns from './ru.js';
import './flatpickr.min.css';

Flatpickr.localize(l10ns.ru);

const defaultOptions = {
    altInput: true,
    altFormat: "D d"
};

Object.assign(Flatpickr.defaultConfig, defaultOptions);

export default Flatpickr;

