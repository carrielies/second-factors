export default function(state={ gg3: { request: {}, response: {}}, helpdesk: {}, registration: {}, spacegov: {} }, action ) {

    switch(action.type) {
        case 'SAVE_SESSION':
            return save(state, action.name, action.data);
        case 'CLEAR_SESSION':
            return clear(state, action.name );
        default:
            return state
    }
}

function save(state, name, data) {
    let session = {...state[name]} || {};
    let newState = {...state};
    newState[name] = {...session, ...data};
    return newState;
}

function clear(state, name) {
    let d = {};
    d[name] = {};
    let res = {...state, ...d}
    return res;
}
