import {combineReducers} from 'redux';
import currentTooltip from './reducers/currentTooltip.js';
import currentPopup from './reducers/currentPopup.js';
import searchFilters from './reducers/searchFilters.js';
import data from './reducers/data.js';

export default combineReducers({
    currentTooltip,
    currentPopup,
    searchFilters,
    data
});