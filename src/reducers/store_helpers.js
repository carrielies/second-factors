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

function saveSession(dispatchFn, name, data) {
    dispatchFn( {type: 'SAVE_SESSION', name, data})
}