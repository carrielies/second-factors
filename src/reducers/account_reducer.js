const initState = {
  signed_in: false
};

export default function(state=initState, action ) {
    switch(action.type) {
        case 'SIGN_IN':
            return {...state, signed_in: true };
        default:
            return state
    }
}
