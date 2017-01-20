import {combineReducers} from 'redux';
import conversionPathDataReducer from './data/conversionPathData.js'
//import worldMapDataReducer from './data/worldMapData.js'

export default combineReducers({
    conversionPathData:conversionPathDataReducer//,
    //worldMapData:worldMapDataReducer
});