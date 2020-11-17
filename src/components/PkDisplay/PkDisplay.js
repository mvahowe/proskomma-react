import React, {Component} from 'react';

class PkDisplay extends Component {

    header() {
        // Override this in subclass
        return <header className="PkDisplay-header">PkDisplay Default Header</header>;
    }

    content() {
        // Override this in subclass
        return <div className="PkDisplay-content">PkDisplay Default Content</div>
    }

    message() {
        // Override to take control of the message logic (but please handle failures)
        if ("success" in this.props.queryOutput.component && !this.props.queryOutput.component.success) {
            return this.failMessage();
        } else {
            return this.successMessage();
        }
    }

    failMessage() {
        // Override to change output on fail (but please handle failures)
        return <div className="PkDisplay-componentMessage">{this.props.queryOutput.component.message}</div>;
    }

    successMessage() {
        // Override to display a message on success while keeping fail logic
    }

    render() {
        return (
            <div className="PkDisplay">
                {this.header()}
                {this.content()}
                {this.message()}
                {
                    (this.props.showTime) ?
                        <div className="PkDisplay-queryTime">Query Output in {this.props.queryOutput.component.queryTime} msec</div> :
                        ""
                }
                {
                    (this.props.showRawResults) ?
                        <div className="PkDisplay-queryResults">
                            <pre>{JSON.stringify(this.props.queryOutput.results, null, 2)}</pre>
                        </div> :
                        ""
                }
            </div>
        );
    }
}

export default PkDisplay;
