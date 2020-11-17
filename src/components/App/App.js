import './App.css';
import PkQuery from '../PkQuery/PkQuery';
import PkDisplay from '../PkDisplay/PkDisplay';

function App(props) {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Hello Proskomma-React
                </p>
            </header>
            <PkQuery
                pk={new props.ProsKomma()}
                queryTemplates={{main: '{ processor packageVersion}'}}
                inputValue ={{}}
                displayClass={PkDisplay}
                showRawResults="true"
                showTime="true"
            />
        </div>
    );
}

export default App;
