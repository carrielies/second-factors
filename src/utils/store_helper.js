import moment from 'moment'

export default class StoreHelper {

    constructor(store) {
        this.store = store;
        this.account = store.account;
        this.server = store.server;
        this.service = store.service;
        this.cookie = store.cookie;
    }

    saveAccount(data) {
        this.store.dispatch({type: "SAVE_ACCOUNT", data: {...this.account, ...data}})
    }

    saveCookie(data) {
        this.store.dispatch({type: "SAVE_COOKIE", data: {...this.cookie, ...data}})
    }

    saveServer(data) {
        this.store.dispatch({type: "SAVE_SERVER", data: {...this.server, ...data}})
    }

    saveService(data) {
        this.store.dispatch({type: "SAVE_SERVICE", data: {...this.service, ...data}})
    }
    
    
    saveInteraction( type, event ) {
        let interactions = this.account.interactions;
        let time = moment(new Date()).format('DD/MM/YY HH:mm:ss');

        interactions.push( {type, event, time});
        this.store.dispatch({type: "SAVE_ACCOUNT", data: {...this.account, interactions}})
    }

    findAccountByEmailAndPassword(email, password) {
        const account = this.server[email];
        if ( !account ) return null;
        if ( account.factors.password.secret != password ) return null;
        return account;
    }

    findAccountByEmail(email) {
        const account = this.server[email];
        return account;
    }

}