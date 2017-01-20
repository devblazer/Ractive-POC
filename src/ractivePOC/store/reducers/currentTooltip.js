export default (state=null, action) => {
    switch (action.type) {
        case 'currentTooltip':
            state = action.value;
            break;
    }
    return state;
};