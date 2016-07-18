const initState = {
  signed_in: false,
    email: "average@joe.com",
    factors: {
        password: {
            secret: "password"
        }
    }
};

export default function(state=initState, action ) {
    switch(action.type) {
        case 'SAVE_ACCOUNT':
            return {...state, ...action.data};
        case 'CLEAR_ACCOUNT':
            return {};

        default:
            return state
    }
}
