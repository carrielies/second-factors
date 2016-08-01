import React from 'react'

export default class QuestionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {errors: {}};
    }

    trust_id() {
        return 'TRxxxxxxxx-xxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    group_id() {
        return 'GRxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }


    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

    }

    cred_id() {
        return 'GWxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

    }


    validate(e,rules,callback) {
        let errors = {};
        let props = {};
        let refs = this.refs;
        Object.keys(rules).forEach( (k) => {
            let val = refs[k].value();
            props[k] = val;
            let regEx = rules[k].regEx || /\w+/;
            if (!val || ! val.match(regEx) ) errors[k] = rules[k]
        });

        this.setState( {errors});

        if (Object.keys(errors).length != 0 ) {
            e.preventDefault();
            return false;
        }
        else {
            if ( callback ) {
                callback(props)
            }
            return props;
        }
    }
    
    doNothing(e) {
        e.preventDefault();
    }

    getQueryParameter(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


}