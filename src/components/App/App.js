import './App.css';
import PkQuery from '../PkQuery/PkQuery';
import PkDisplay from '../PkDisplay/PkDisplay';

function App(props) {
    return (
        <div className="App">
            <PkQuery
                pk={props.pk}
                queryTemplates={{main: '{ processor packageVersion documents { sequences { blocks(withScopes:["chapter/%chapter%"]) { text } } } }'}}
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
