import React from 'react'

import { browserHistory, Link } from 'react-router'

export default class extends React.Component {

    back(e) {
        e.preventDefault();
        browserHistory.goBack();
    }

    render() {
        return (
            <div className="grid-row bread">
                <div className="column-two-thirds">
                    <div className="text">{this.props.text}</div>
                </div>
                <div className="column-one-third align-right">
                    {!this.props.hide_back ?
                        <div><a href="#back" onClick={(e) => this.back(e)} className="link-back space-right">Back</a></div> : null }
                </div>
            </div>

        )
    }
}
