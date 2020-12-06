import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: x-small;
  font-family: monospace;
  white-space: pre-wrap;
`

const Content = styled.div`
  font-size: x-large;
  font-weight: bold;
`;

const QueryTime = styled.div`
  margin-top: 20px;
  font-style: italic;
`

const RawResults = styled.div`
  margin-top: 20px;
`
const Queries = RawResults;

class PkDisplay extends Component {
  content() {
    // Override this in subclass
    return <Content className="PkDisplay-content">
      PkDisplay Default Content
        </Content>
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
      <Container>
        {this.content()}
        {this.message()}
        {
          (this.ready() && this.props.showQuery) ?
            <Queries>
              {"{\n"}
              {Object.entries(this.props.queryOutput.queries).map(kv => `  "${kv[0]}": "${kv[1].trim()}",\n`)}
              {"}"}
            </Queries> :
            ""
        }
        {
          (this.ready() && this.props.showTime) ?
            <QueryTime className="PkDisplay-queryTime">
              Query Output in {this.props.queryOutput.component.queryTime} msec
                        </QueryTime> :
            ""
        }
        {
          (this.ready() && this.props.showRawResults) ?
            <RawResults className="PkDisplay-queryResults">
              {JSON.stringify(this.props.queryOutput.results, null, 2)}
            </RawResults> :
            ""
        }
      </Container>
    );

  }
}

export default PkDisplay;
