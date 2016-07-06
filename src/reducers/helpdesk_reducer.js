const initState = {
};

export default function(state=initState, action ) {
    switch(action.type) {
        case 'SAVE_HELPDESK':
            return {...state, ...action.data};
        default:
            return state
    }
}
