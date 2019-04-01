/**
 * @class TextEditor
 */

import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ITextWidget } from ".";

export type TextEditorProps = {
  widget: ITextWidget;
  openForm: { (widgetId: string): void };
  onChange: { (newWidget: ITextWidget): void };
};

export default class TextEditor extends React.Component<TextEditorProps> {
  render() {
    const { widget, openForm, onChange } = this.props;
    const {
      _id,
      data: { text, textAlign, heading }
    } = widget;
    return (
      <TextareaAutosize
        className={`widget_text_editor widget_text ${heading} textAlign-${textAlign}`}
        value={text}
        onClick={ev => ev.stopPropagation()}
        onDoubleClick={ev => {
          ev.stopPropagation();
          openForm(_id);
        }}
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
