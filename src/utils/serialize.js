import {importSession} from '../reducers/helpers'
import {rawDb as spacegov_db, reset as spacegov_db_reset} from '../utils/spacegov_db'
import {rawDb as accounts_db, reset as accounts_db_reset} from '../utils/database'

let data = {};

export function serialize(session) {
    data = {session};
    return exportDb(spacegov_db()).then((d) => {
        data.spacegov_db = d;
    })
    .then( () => {
        return exportDb(accounts_db())
    })
    .then((d) => {
        data.accounts_db = d;
        return btoa(JSON.stringify(data));
    })
}

export function deserialize(dispatch, b64_data) {
    accounts_db_reset();
    spacegov_db_reset();
    let d = JSON.parse(atob(b64_data));
    importSession(dispatch, d.session);
    return importDb(spacegov_db(), d.spacegov_db)
    .then( () => {
        return importDb(accounts_db(), d.accounts_db)
    })
    .then( () => {
        return d.session
    });
}

function exportDb(db) {
    return db.findAsync({}).then((docs) => {
        return docs;
    });
}

function importDb(db, docs) {
    return db.insertAsync(docs);
}

