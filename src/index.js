import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/App';

import titUsfm from './test_data/en_aligned_tit.usfm';
import {ProsKomma} from 'proskomma';

const pk = new ProsKomma();

pk.importDocument(
    {lang: "fra", abbr: "hello"},
    "usfm",
    titUsfm);

ReactDOM.render(
    <App
        pk={pk}
        inputFields={[
            {
                name: "chapter",
                label: "Chapter",
                displayType: "text",
                regex: "^[01][0-9]{0, 2}$",
                initialValue: "3"
            },
            {
                name: "verse",
                label: "Verse",
                displayType: "text",
                regex: "^[01][0-9]{0, 2}$",
                initialValue: "1"
            }
        ]}
    />,
    document.getElementById('root')
);
