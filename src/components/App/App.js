import './App.css';
import PkQuery from '../PkQuery/PkQuery';
import PkDisplay from '../PkDisplay/PkDisplay';

function App(props) {
    return (
        <div className="App">
            <PkQuery
                pk={props.pk}
                queryTemplates={{main: '{\n' +
                        '    processor\n' +
                        '    packageVersion\n' +
                        '    documents {\n' +
                        '      sequences {\n' +
                        '        blocks(withScopes:["chapter/%chapter%"]) {\n' +
                        '          text(normalizeSpace:true)\n' +
                        '        }\n' +
                        '      }\n' +
                        '    }\n' +
                        '  }\n'}}
                inputValues={{chapter: "2"}}
                displayClass={PkDisplay}
                showQuery={true}
                showRawResults={true}
                showTime={true}
            />
        </div>
    );
}

export default App;
