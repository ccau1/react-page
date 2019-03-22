/**
 * @class TextForm
 */

import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

// import styles from "./styles.css";

export type TextFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class TextForm extends React.Component<TextFormProps> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { text }
    } = widget;
    console.log("Text FORM", text);

    return (
      <div className={"widget_text_form"}>
        <TextareaAutosize
          className="widget_text_form_text"
          value={text}
          onChange={(ev: any) =>
            onChange({
              ...widget,
              data: { ...widget.data, text: ev.target.value }
            })
          }
        />
      </div>
    );
  }
}
