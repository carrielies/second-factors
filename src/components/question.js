import React from 'react'
import ErrorSummary from './error_summary'
import Content from './content'

export default class extends React.Component {

    render() {
        let errorSummary = this.props.errors ? <ErrorSummary errors={this.props.errors} header="Form errors"/> : null;

        return (
            <div>
                <Content title={this.props.title}>
                    <p>
                        {this.props.para}
                    </p>
                </Content>
                <form>
                    <fieldset>
                        {this.props.children}
                    </fieldset>
                </form>
                {errorSummary}
            </div>
        )
    }
}
