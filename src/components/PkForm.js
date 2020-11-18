import React, {Component} from 'react';

class PkForm extends Component {

    handleChange(event, field) {
        if (event) {
            this.props.setFieldValue(field, event.target.value);
            this.props.setFormUpdate();
        }
    }

    render() {
        let count=0;
        return (
            <div className="PkForm">
                {this.props.inputFields.map(f =>
                    <div key={count++}>
                        <span><b>{f.label || f.name}</b></span>
                        <input
                            name={f.name}
                            type="text"
                            value={this.props.fieldValues ? this.props.fieldValues[f.name]: ""}
                            onChange={async (event) => await this.handleChange(event, f.name)}
                        />
                    </div>
                )}
            </div>
        );

    }
}

export default PkForm;
