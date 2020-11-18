import React, {Component, useEffect} from 'react';

class PkDisplay extends Component {

    content() {
        // Override this in subclass
        return <div className="PkDisplay-content">
            PkDisplay Default Content
        </div>
    }

    message() {
        // Override to take control of the message logic (but please handle failures)
        if (!this.ready()) {
            return this.loadingMessage();
        } else if ("success" in this.props.queryOutput.component && !this.props.queryOutput.component.success) {
            return this.failMessage();
        } else {
            return this.successMessage();
        }
    }

    ready() {
        return ("queryOutput" in this.props) && ("component" in this.props.queryOutput);
    }

    failMessage() {
        // Override to change output on fail (but please handle failures)
        return <div className="PkDisplay-componentMessage">
            {this.props.queryOutput.component.message}
        </div>;
    }

    loadingMessage() {
        // Override to change output while waiting for a query response
        return <div className="PkDisplay-componentMessage">
            Loading...
        </div>;
    }

    successMessage() {
        // Override to display a message on success while keeping fail logic
        return "";
    }

    render() {
        return (
            <div className="PkDisplay">
                {this.content()}
                {this.message()}
                {
                    (this.ready() && this.props.showQuery) ?
                        <div className="PkDisplay-queries">
                            {"{\n"}
                                {Object.entries(this.props.queryOutput.queries).map(kv => `  "${kv[0]}": "${kv[1].trim()}",\n`)}
                                {"}"}
                        </div> :
                        ""
                }
                {
                    (this.ready() && this.props.showTime) ?
                        <div className="PkDisplay-queryTime">
                            Query Output in {this.props.queryOutput.component.queryTime} msec
                        </div> :
                        ""
                }
                {
                    (this.ready() && this.props.showRawResults) ?
                        <div className="PkDisplay-rawResults">
                            {JSON.stringify(this.props.queryOutput.results, null, 2)}
                        </div> :
                        ""
                }
            </div>
        );

    }
}

export default PkDisplay;
