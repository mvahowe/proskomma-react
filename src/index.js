import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/App/App';

import titUsfm from './test_data/en_aligned_tit.usfm';
import {ProsKomma} from 'proskomma';

const pk = new ProsKomma();

pk.importDocument(
    {lang: "fra", abbr: "hello"},
    "usfm",
    titUsfm);

ReactDOM.render(
    <App pk={pk}/>,
    document.getElementById('root')
);
