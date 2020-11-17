import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { ProsKomma } from 'proskomma';

ReactDOM.render(
    <App pk = {new ProsKomma()}/>,
  document.getElementById('root')
);
