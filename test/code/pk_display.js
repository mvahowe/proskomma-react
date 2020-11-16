import React from 'react';
import test from 'tape';
import reactDom from 'react-dom/server';
import dom from 'cheerio';
import PkDisplay from '../../src/components/PkDisplay/PkDisplay';

const render = reactDom.renderToStaticMarkup;

test('PkDisplay', t => {
    t.plan(8);
    const makeDisplay = flag => <PkDisplay
        queryOutput={{
            component: {
                success: flag,
                message: "Here's a message",
                queryTime: 23
            },
            results: {
                main: {
                    "data": {
                        "documents": [{
                            "headers": [{
                                "key": "id",
                                "value": "MRK Mark's Gospel, translated by Mark"
                            }]
                        }]
                    }
                }
            }
        }}
        showRawResults={flag}
        showTime={flag}
    />;
    const $ = dom.load(render(makeDisplay(true)));
    t.ok($('.PkDisplay-content').html());
    t.false($('.PkDisplay-componentMessage').html());
    t.ok($('.PkDisplay-queryTime').html());
    t.ok($('.PkDisplay-queryResults').html());
    let $2 = dom.load(render(makeDisplay(false)));
    t.ok($2('.PkDisplay-content').html());
    t.ok($2('.PkDisplay-componentMessage').html());
    t.false($2('.PkDisplay-queryTime').html());
    t.false($2('.PkDisplay-queryResults').html());
    console.log($.html());
});

