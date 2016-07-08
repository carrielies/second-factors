import fecha from 'fecha'

export default class StoreHelper {

    constructor(store) {
        this.store = store;
        this.account = store.account;
        this.server = store.server;
        this.service = store.service;
        this.cookie = store.cookie;
        this.helpdesk = store.helpdesk;
    }

    saveAccount(data) {
        this.store.dispatch({type: "SAVE_ACCOUNT", data: {...this.account, ...data}})
    }

    saveCookie(data) {
        this.store.dispatch({type: "SAVE_COOKIE", data: {...this.cookie, ...data}})
    }
    
    clearCookie(data) {
        this.store.dispatch({type: "CLEAR_COOKIE", data: {}})
    }

    saveServer(data) {
        this.store.dispatch({type: "SAVE_SERVER", data: {...this.server, ...data}})
    }

    saveServerAccount(account) {
        let data = {};
        data[account.email] = account
        this.saveServer(data);
    }

    serverAccount(email) {
        let account = this.findAccountByEmail(email);
        account.breakTrust = () => {
            account.trust_id= this.guid();
            return account;
        };
        return account;
    }


    saveService(data) {
        this.store.dispatch({type: "SAVE_SERVICE", data: {...this.service, ...data}})
    }

    saveHelpdesk(data) {
        this.store.dispatch({type: "SAVE_HELPDESK", data: {...this.helpdesk, ...data}})
    }


    saveInteraction( origin, event, account ) {

        let acc = account ? account : this.account
        let interactions = acc.interactions;
        let time = fecha.format(new Date()).format('DD/MM/YY HH:mm:ss');
        interactions.push( {origin, event, time});
        this.store.dispatch({type: "SAVE_ACCOUNT", data: {...this.acc, interactions}})
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

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

    }

}
