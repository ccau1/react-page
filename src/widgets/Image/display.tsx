/**
 * @class ImageDisplay
 */

import * as React from "react";

// import styles from "./styles.css";

export type ImageDisplayProps = { widget: Widget };

export default class ImageDisplay extends React.Component<ImageDisplayProps> {
  render() {
    const {
      widget: {
        data: { text }
      }
    } = this.props;

    return <p className={"widget_text"}>{text}</p>;
  }
}
