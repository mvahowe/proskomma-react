import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-bottom: 20px;
  margin-top: 5px;
`

const FormLabel = styled.span`
  font-size: small;
  display: inline-block;
  width: 96px;
  text-align: right;
  font-weight: bold;
  padding-right: 10px;
`

const FormRow = styled.div`
  margin-top: 5px;
`

const Input = styled.input`
  background-color: #eee;
`

class PkForm extends Component {
  handleChange(event, field) {
    if (event) {
      this.props.setFieldValue(field, event.target.value);
    }
  }

  render() {
    let count = 0;
    return (
      <Container>
        {this.props.inputFields.map(f =>
          <FormRow key={count++}>
            <FormLabel>{f.label || f.name}</FormLabel>
            <Input
              name={f.name}
              type="text"
              value={this.props.fieldValues ? this.props.fieldValues[f.name] : ""}
              onChange={async (event) => await this.handleChange(event, f.name)}
            />
          </FormRow>
        )}
      </Container>
    );

  }
}

export default PkForm;
