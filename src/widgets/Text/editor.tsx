/**
 * @class TextEditor
 */

import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../../contexts/WidgetFormContext";

// import styles from "./styles.css";

export type TextEditorProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class TextEditor extends React.Component<TextEditorProps> {
  render() {
    const { widget, onChange } = this.props;
    const {
      _id,
      data: { text, textAlign, heading }
    } = widget;
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <TextareaAutosize
            className={`widget_text_editor widget_text ${heading} textAlign-${textAlign}`}
            value={text}
            onClick={ev => ev.stopPropagation()}
            onDoubleClick={ev => {
              ev.stopPropagation();
              openForm(_id, onChange);
            }}
            onChange={(ev: any) =>
              onChange({
                ...widget,
                data: { ...widget.data, text: ev.target.value }
              })
            }
          />
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
