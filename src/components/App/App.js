import './App.css';
import PkDisplay from '../PkDisplay/PkDisplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello Proskomma-React
        </p>
      </header>
        <PkDisplay
            queryOutput={{
                component : {
                    success: true,
                    message: "Here's a message",
                    queryTime: 23
                },
                results: {
                    main: {"data": {"documents":[{"headers":[{"key":"id","value":"MRK Mark's Gospel, translated by Mark"}]}]}}
                }
            }}
            showRawResults={true}
            showTime={true}
        />
    </div>
  );
}

export default App;
