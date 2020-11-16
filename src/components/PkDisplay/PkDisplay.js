import React, {Component} from 'react';
// import './PkDisplay.css';

class PkDisplay extends Component {

    header() {
        // Override this in subclass
        return <header className="PkDisplay-header">PkDisplay Default Header</header>;
    }

    content() {
        // Override this in subclass
        return <div className="PkDisplay-content">PkDisplay Default Content</div>
    }

    render() {
        return (
            <div className="PkDisplay">
                {this.header()}
                {this.content()}
                {
                    ("success" in this.props.queryOutput.component && !this.props.queryOutput.component.success) ?
                        <div className="PkDisplay-componentMessage">{this.props.queryOutput.component.message}</div> :
                        ""
                }
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
