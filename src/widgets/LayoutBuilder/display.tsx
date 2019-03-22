/**
 * @class LayoutBuilderDisplay
 */

import * as React from "react";

// import styles from "./styles.css";

export type LayoutBuilderDisplayProps = { text: string };

export default class LayoutBuilderDisplay extends React.Component<
  LayoutBuilderDisplayProps
> {
  render() {
    // const { text } = this.props;

    return (
      <div className="widget_layoutBuilder">LayoutBuilderDisplay Component</div>
    );
  }
}
