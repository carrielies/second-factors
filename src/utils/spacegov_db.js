var Datastore = require('nedb');
var Promise = require("bluebird");
Promise.promisifyAll(Datastore.prototype);
import fecha from 'fecha'

let db = new Datastore();

export function saveEnrolment(enrolment) {
    return db.insertAsync(enrolment);
}

export function findEnrolment(email ) {
    return db.findAsync({email}).then((enrolments) => {
        return enrolments[0];
    });
}

export function updateEnrolment(enrolment) {
    return db.updateAsync( {email: enrolment.email}, enrolment, {});
}
