/**
 * @class TextDisplay
 */

import * as React from "react";

// import styles from "./styles.css";

export type TextDisplayProps = { widget: Widget };

export default class TextDisplay extends React.Component<TextDisplayProps> {
  render() {
    const {
      widget: {
        data: { text }
      }
    } = this.props;

    return <p className={"widget_text"}>{text}</p>;
  }
}
