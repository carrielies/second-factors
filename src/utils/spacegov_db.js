var Datastore = require('nedb');
var Promise = require("bluebird");
Promise.promisifyAll(Datastore.prototype);
import fecha from 'fecha'

let db = new Datastore();

export function reset() {
    db = new Datastore();
}


export function saveEnrolment(enrolment) {
    return db.insertAsync(enrolment);
}

export function findEnrolment(gg_id ) {
    return db.findAsync({gg_id}).then((enrolments) => {
        return enrolments[0];
    });
}

export function updateEnrolment(enrolment) {
    return db.updateAsync( {gg_id: enrolment.gg_id}, enrolment, {});
}


export function exportEnrolments() {
    return db.findAsync({}).then((enrolments) => {
        return JSON.stringify({data: enrolments})
    });
}

export function rawDb() {
    return db;
}