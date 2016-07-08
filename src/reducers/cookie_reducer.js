const initState = {
};

export default function(state=initState, action ) {

    switch(action.type) {
        case 'SAVE_COOKIE':
            return {...state, ...action.data};
        case 'CLEAR_COOKIE':
            return {};
        default:
            return state
    }
}
