/**
 * @class TextEditorControl
 */

import * as React from "react";

// import styles from "./styles.css";

export type TextEditorControlProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class TextEditorControl extends React.Component<
  TextEditorControlProps
> {
  render() {
    // const { widget, onChange } = this.props;
    // const {
    //   data
    // } = widget;

    return <div />;
  }
}
