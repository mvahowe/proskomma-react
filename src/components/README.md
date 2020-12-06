```js
import React, { Component } from "react";
import PkForm from "./PkForm";
import PkQuery from "./PkQuery";
import PkDisplay from "../PkDisplay";
import titUsfm from "../test_data/en_aligned_tit.usfm";
import { ProsKomma } from "proskomma";
import "./Example.css";
import "../index.css";

const pk = new ProsKomma();

pk.importDocument({ lang: "fra", abbr: "hello" }, "usfm", titUsfm);
const inputFields = [
  {
    name: "chapter",
    label: "Chapter",
    displayType: "text",
    regex: "^[01][0-9]{0, 2}$",
    initialValue: "3",
  },
  {
    name: "verse",
    label: "Verse",
    displayType: "text",
    regex: "^[01][0-9]{0, 2}$",
    initialValue: "1",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValues: Object.fromEntries(
        this.props.inputFields.map((f) => [f.name, f.initialValue])
      ),
      formUpdate: 0,
    };
  }

  setFieldValue(f, v) {
    if (this.state) {
      this.setState({ fieldValues: { ...this.state.fieldValues, [f]: v } });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="heading">
          <img src="favicon-96x96.png" alt="favicon" />
          PROSKOMMA-REACT
        </div>
        <PkForm
          inputFields={this.props.inputFields}
          fieldValues={this.state.fieldValues}
          setFieldValue={(k, v) => this.setFieldValue(k, v)}
        />
        <PkQuery
          pk={this.props.pk}
          queryTemplates={{
            main:
              "{\n" +
              "    processor\n" +
              "    packageVersion\n" +
              "    documents {\n" +
              "      sequences {\n" +
              '        blocks(withScopes:["chapter/%chapter%", "verse/%verse%"]) {\n' +
              "          text(normalizeSpace:true)\n" +
              "        }\n" +
              "      }\n" +
              "    }\n" +
              "  }\n",
          }}
          fieldValues={this.state.fieldValues}
          displayClass={PkDisplay}
          showQuery={true}
          showRawResults={true}
          showTime={true}
        />
      </div>
    );
  }
}
```
