import React, { Component } from "react";

import { PageEditor } from "react-page";
import "react-page/src/styles.css";

import example1Page from "./page_logistics";
import { widgets as widgetTypes } from "./widgets";

export default class App extends Component {
  state = {
    page: example1Page,
    locale: "en",
    availableLocales: ["en", "zh-hk", "zh-cn"]
  };
  render() {
    console.log("app level", this.state.page, this.state.locale);
    return (
      <div style={{ height: "100%" }}>
        <PageEditor
          page={this.state.page}
          widgetTypes={widgetTypes}
          onChange={page => this.setState({ page })}
          locale={this.state.locale}
          onLocaleChange={locale => this.setState({ locale })}
          availableLocales={["en", "zh-hk", "zh-cn"]}
        />
      </div>
    );
  }
}
