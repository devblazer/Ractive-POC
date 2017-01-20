export default (state=null, action) => {
    switch (action.type) {
        case 'currentPopup':
            state = action.value;
            break;
    }
    return state;
};