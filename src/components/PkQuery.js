import React, {Component} from 'react';
import deepEqual from 'deep-equal';

class PkQuery extends Component {

    constructor() {
        super();
        this.state = {
            queryOutput: {}
        }
    }

    async runQueries() {
        const startTime = Date.now();
        const ret = {queries: {}, results: {}, component: {}};
        for (let [queryName, queryTemplate] of Object.entries(this.props.queryTemplates)) {
            ret.queries[queryName] = this.substitutedQuery(queryTemplate);
            ret.results[queryName] = await this.runQuery(ret.queries[queryName]);
        }
        const failedQueries = Object.entries(ret.results).filter(r => r[1].errors).map(kv => kv[0]);
        const nTemplates = Object.keys(this.props.queryTemplates).length;
        const nFailed = failedQueries.length;
        const failedKeys = failedQueries.join(", ");
        ret.component.success = (failedQueries.length === 0);
        ret.component.message = (
            ret.component.success ?
                `${nTemplates} Quer${nTemplates === 1 ? "y" : "ies"} succeeded` :
                `${nFailed}/${nTemplates} Quer${nFailed === 1 ? "y" : "ies"} failed (${failedKeys})`);
        ret.component.queryTime = Date.now() - startTime;
        return ret;
    }

    substitutedQuery(template) {
        const graphqlSpecialChars = new RegExp("[\"()\\[\\]{|}]");
        let ret = template;
        for (const [k, v] of Object.entries(this.props.fieldValues)) {
            if (!k.startsWith("_scary") && graphqlSpecialChars.test(v)) {
                continue;
            }
            ret = ret.replace(new RegExp(`%${k}%`, "g"), v);
        }
        return ret;
    }

    async runQuery(query) {
        return await this.props.pk.gqlQuery(query);
    }

    async componentDidMount() {
        const results = await this.runQueries();
        this.setState({queryOutput: results});
    }

    async componentDidUpdate(prevProps, prevState) {
        if (!deepEqual(prevProps.fieldValues, this.props.fieldValues)) {
            const results = await this.runQueries();
            this.setState({queryOutput: results});
        }
    }

    render() {
        const DisplayClass = this.props.displayClass;
        if (this.props.fieldValues) {
            return (<DisplayClass
                    queryOutput={this.state.queryOutput}
                    showQuery={this.props.showQuery}
                    showRawResults={this.props.showRawResults}
                    showTime={this.props.showTime}
                />
            );
        } else {
            return (<div>Loading...</div>)
        }
    }

}

export default PkQuery;
