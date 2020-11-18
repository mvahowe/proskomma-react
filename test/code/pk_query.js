import React from 'react';
import test from 'tape';
import reactDom from 'react-dom/server';
import dom from 'cheerio';
import PkDisplay from '../../src/components/PkDisplay';
import PkQuery from "../../src/components/PkQuery";

import titUsfm from '../../src/test_data/en_aligned_tit.usfm';
import {ProsKomma} from 'proskomma';

const pk = new ProsKomma();

pk.importDocument(
    {lang: "fra", abbr: "hello"},
    "usfm",
    titUsfm);

const render = reactDom.renderToStaticMarkup;

test('PkQuery', t => {
    t.plan(1);
    const makeQuery = (chapter) => <PkQuery
        pk={pk}
        queryTemplates={{main: '{ processor packageVersion\n' +
                '    documents {\n' +
                '      sequences {\n' +
                '        blocks(withScopes:["chapter/%chapter%"]) {\n' +
                '          text(normalizeSpace:true)\n' +
                '        }\n' +
                '      }\n' +
                '    }\n' +
                '  }\n'}}
        inputValues={{chapter: chapter}}
        displayClass={PkDisplay}
        showQuery={true}
        showRawResults={true}
        showTime={true}
    />;
    new Promise(resolve => setTimeout(resolve, 2000)).then();
    const rendered = render(makeQuery("2"));
    new Promise(resolve => setTimeout(resolve, 2000)).then();
    const $ = dom.load(rendered);
    console.log($.html());
    t.ok($('.PkDisplay-content').html());
});

