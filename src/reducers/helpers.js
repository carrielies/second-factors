export function saveRegistrationSession(dispatchFn, data) {
    saveSession(dispatchFn, "registration", data);
}

export function saveHelpdeskSession(dispatchFn, data) {
    saveSession(dispatchFn, "helpdesk", data);
}

export function saveGG3Session(dispatchFn, data) {
    saveSession(dispatchFn, "gg3", data);
}

export function saveSpacegovSession(dispatchFn, data) {
    saveSession(dispatchFn, "spacegov", data);
}


export function clearRegistrationSession(dispatchFn) {
    clearSession(dispatchFn, "registration");
}

export function clearHelpdeskSession(dispatchFn) {
    clearSession(dispatchFn, "helpdesk");
}

export function clearGG3Session(dispatchFn) {
    clearSession(dispatchFn, "gg3");
}

export function clearSpacegovSession(dispatchFn) {
    clearSession(dispatchFn, "spacegov");
}

export function clearAllSessions(dispatchFn) {
    clearRegistrationSession(dispatchFn);
    clearHelpdeskSession(dispatchFn);
    clearGG3Session(dispatchFn);
    clearSpacegovSession(dispatchFn);
}




function saveSession(dispatchFn, name, data) {
    dispatchFn( {type: 'SAVE_SESSION', name, data})
}

function clearSession(dispatchFn, name) {
    dispatchFn( {type: 'CLEAR_SESSION', name})
}