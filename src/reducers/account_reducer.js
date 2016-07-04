const initState = {
  signed_in: false
};

export default function(state=initState, action ) {
    switch(action.type) {
        case 'SAVE_ACCOUNT':
            return {...state, ...action.data};
        default:
            return state
    }
}
