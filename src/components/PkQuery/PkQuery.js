import React, {Component} from 'react';

class PkQuery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            queryOutput: {}
        }
    }

    async runQueries() {
        const startTime = Date.now();
        const ret = {results: {}, component: {}};
        for (let [queryName, queryTemplate] of Object.entries(this.props.queryTemplates)) {
            ret.results[queryName] = await this.runQuery(this.substitutedQuery(queryTemplate));
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
        let ret = template;
        for (const [k, v] of Object.entries(this.props.inputValues)) {
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

    render() {
        const DisplayClass = this.props.displayClass;
        return (
            <DisplayClass
                queryOutput = {this.state.queryOutput}
                showRawResults = {this.props.showRawResults}
                showTime = {this.props.showTime}
            />
        );
    }
}

export default PkQuery;
