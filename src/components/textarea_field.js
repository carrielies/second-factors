import React from 'react'

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    value() {
        return this.refs.inp.value
    }

    render() {
        let errors = this.props.errors || {};

        return (
            <div>
                <div className={errors[this.props.name] ? "error" : ""}>
                    <label className="form-label-bold">{this.props.labelText}
                        <span className="form-hint">{this.props.labelHint}</span>
                        {errors[this.props.name] ? <span className="error-message"> {errors[this.props.name].msg} </span> : null}
                    </label>
                    <textarea className="form-control" id={this.props.name} name={this.props.name} ref="inp"></textarea>
                </div>
                <br/>
            </div>
        )
    }
}
