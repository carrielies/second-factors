const initState = {
  signed_in: false
};

export default function(state=initState, action ) {
    switch(action.type) {
        case 'SIGN_IN':
            return {...state, signed_in: true };
        case 'FINGERPRINT':
            return {...state, fingerprint: action.data };
        case 'FIRSTNAMES':
            return {...state, firstnames: action.data };
        case 'LASTNAME':
            return {...state, lastname: action.data };
        case 'EMAIL':
            return {...state, email: action.data };
        case 'PASSWORD':
            return {...state, password: action.data };
        case 'GA_SECRET':
            return {...state, ga_secret: action.data };
        case 'GA_TOKEN':
            return {...state, ga_token: action.data };
            
        default:
            return state
    }
}
