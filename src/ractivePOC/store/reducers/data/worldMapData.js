import worldMapData from './worldMapData.json';

export default (state={
    isLoading: false,
    circleHovered: null,
    closeSelected: null,
    data: []
}, action) => {
    switch (action.type) {
        case 'deviceReport.currentConversionPathCircleHover':
            state = {
                ...state,
                circleHovered: action.value
            };
            break;
        case 'deviceReport.selectConversionPathCircle':
            state = {
                ...state,
            };
            state[action.step+'Selected'] = state[action.step+'Selected']==action.value ? null : action.value;
            break;
        case 'deviceReport.dateFilter':
            state = {
                ...state,
                isLoading: true
            };
            break;
        case 'deviceReport.conversionPathDataLoaded':
            state = {
                ...state,
                isLoading: false,
                data: action.data
            };
            break;
    }
    return state;
};