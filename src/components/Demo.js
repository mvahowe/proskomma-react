
import styled from "styled-components";
import PkForm from "./PkForm";
import PkQuery from "./PkQuery";
import PkDisplay from "./";
import titUsfm from "../test_data/en_aligned_tit.usfm";
import { ProsKomma } from "proskomma";
const Container = styled.div`
  padding: 10px;
`;

const Heading = styled.div`
  padding-bottom: 30px;
  font-size: xx-large;
  font-weight: bold;
  font-style: italic;
  img {
    padding-right: 10px;
  }
`;

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

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValues: Object.fromEntries(
        inputFields.map((f) => [f.name, f.initialValue])
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
      <Container>
        <Heading>
          <img src="favicon-96x96.png" alt="favicon" />
          PROSKOMMA-REACT
        </Heading>
        <PkForm
          inputFields={inputFields}
          fieldValues={this.state.fieldValues}
          setFieldValue={(k, v) => this.setFieldValue(k, v)}
        />
        <PkQuery
          pk={pk}
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
      </Container>
    );
  }
}

export default Demo;