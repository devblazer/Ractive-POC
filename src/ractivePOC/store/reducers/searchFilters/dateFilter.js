import moment from 'moment';

export default (state={
    startDate: moment().subtract(7,'days'),
    endDate: moment()
}, action) => {
    switch (action.type) {
        case 'deviceReport.dateFilter':
            state = {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate
            };
            break;
    }
    return state;
};