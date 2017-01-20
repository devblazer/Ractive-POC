import {combineReducers} from 'redux';
import dateFilterReducer from './searchFilters/dateFilter.js'

export default combineReducers({
    dateFilter:dateFilterReducer
});