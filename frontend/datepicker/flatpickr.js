'use strict';

import flatpickr from './Flatpickr/flatpickr.min.js';
import { Russian } from './Flatpickr/ru.js';
import './Flatpickr/flatpickr.min.css';

flatpickr.localize(Russian);

const defaultOptions = {
    altInput: true,
    altFormat: 'D d'
};

Object.assign(flatpickr.defaultConfig, defaultOptions);

export default flatpickr;

