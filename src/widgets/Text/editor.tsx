/**
 * @class TextEditor
 */

import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

// import styles from "./styles.css";

export type TextEditorProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class TextEditor extends React.Component<TextEditorProps> {
  height = 0;

  autoGrow = (element: any) => {
    console.log("ele", element);
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  };
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { text }
    } = widget;
    return (
      <TextareaAutosize
        className="widget_text_editor"
        value={text}
        onChange={(ev: any) =>
          onChange({
            ...widget,
            data: { ...widget.data, text: ev.target.value }
          })
        }
      />
    );
  }
}
