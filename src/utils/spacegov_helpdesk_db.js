var Datastore = require('nedb');
var Promise = require("bluebird");
Promise.promisifyAll(Datastore.prototype);
import fecha from 'fecha'


let db = new Datastore();

export function reset() {
    db = new Datastore();
}

export function saveGroupEnrolment(groupEnrolment) {
    return db.insertAsync(groupEnrolment);
}

export function findGroupEnrolment(group_id ) {
    return db.findAsync({group_id}).then((groupEnrolments) => {
        return groupEnrolments[0];
    });
}

export function exportGroupEnrolments() {
    return db.findAsync({})
}

export function rawDb() {
    return db;
}

saveGroupEnrolment({
    group_id: "GR587HELP",
    org_name: "Spacegov Helpdesk"
});

