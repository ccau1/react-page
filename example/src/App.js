import React, { Component } from "react";

import { PageEditor } from "react-page";
import "react-page/src/styles.css";

import example1Page from "./example1.page";
import { widgets as widgetTypes } from "./widgets";

export default class App extends Component {
  state = {
    page: example1Page
  };
  render() {
    console.log("app level", this.state.page);
    return (
      <div style={{ height: "100%" }}>
        <PageEditor
          page={this.state.page}
          widgetTypes={widgetTypes}
          onChange={page => this.setState({ page })}
        />
      </div>
    );
  }
}
