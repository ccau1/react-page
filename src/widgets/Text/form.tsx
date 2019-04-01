/**
 * @class TextForm
 */

import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import TextEditorControl from "./editorControl";
import { ITextWidget } from ".";

// import styles from "./styles.css";

export type TextFormProps = {
  widget: ITextWidget;
  onChange: { (newWidget: ITextWidget): void };
};

export default class TextForm extends React.Component<TextFormProps> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { text, textAlign, heading }
    } = widget;

    return (
      <div className={"widget_text_form"}>
        <TextEditorControl widget={widget} onChange={onChange} />
        <TextareaAutosize
          className={`widget_text_form_text widget_text ${heading} textAlign-${textAlign}`}
          value={text}
          onChange={(ev: any) => {
            ev.stopPropagation();
            onChange({
              ...widget,
              data: { ...widget.data, text: ev.target.value }
            });
          }}
        />
      </div>
    );
  }
}
