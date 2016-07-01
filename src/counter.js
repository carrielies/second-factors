import React from 'react'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'

export default connect((state) => state) (
    class extends React.Component {

        onClick(e) {
            this.props.dispatch( {type: "TICK"})
        }

        render() {
            return (
                <div>
                    <h1>{this.props.app.count}</h1>
                    <button onClick={() => this.props.dispatch( {type: "TICK"} ) }>tick</button>
                    <button onClick={() => this.props.dispatch( push("/boo"))}>boo</button>
                </div>
            )
        }

    }
)