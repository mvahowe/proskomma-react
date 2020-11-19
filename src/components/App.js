import React, {Component} from 'react';
import './App.css';
import PkForm from './PkForm';
import PkQuery from './PkQuery';
import PkDisplay from './PkDisplay';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldValues: Object.fromEntries(this.props.inputFields.map(f => [f.name, f.initialValue])),
            formUpdate: 0
        };
    }

    setFieldValue(f, v) {
        if (this.state) {
            this.setState({fieldValues: {...this.state.fieldValues, [f]: v}});
        }
    }

    render() {
        return (
            <div className="App">
                <div className="heading">
                    <img src="favicon-96x96.png" alt="favicon"/>
                    PROSKOMMA-REACT
                </div>
                <PkForm
                    inputFields={this.props.inputFields}
                    fieldValues={this.state.fieldValues}
                    setFieldValue={(k, v) => this.setFieldValue(k, v)}
                />
                <PkQuery
                    pk={this.props.pk}
                    queryTemplates={{
                        main: '{\n' +
                            '    processor\n' +
                            '    packageVersion\n' +
                            '    documents {\n' +
                            '      sequences {\n' +
                            '        blocks(withScopes:["chapter/%chapter%", "verse/%verse%"]) {\n' +
                            '          text(normalizeSpace:true)\n' +
                            '        }\n' +
                            '      }\n' +
                            '    }\n' +
                            '  }\n'
                    }}
                    fieldValues={this.state.fieldValues}
                    displayClass={PkDisplay}
                    showQuery={true}
                    showRawResults={true}
                    showTime={true}
                />
            </div>
        );
    }
}

export default App;

/*

 */
