/**
 * @class PageEditorWidgetLayoutInlineStyleForms
 */

import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

export type PageEditorWidgetLayoutInlineStyleFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidgetLayoutInlineStyleForm extends React.Component<
  PageEditorWidgetLayoutInlineStyleFormProps
> {
  render() {
    const { widget, onChange } = this.props;
    if (!widget) {
      return <div>no widget selected</div>;
    }

    return (
      <div className={`page_editor_widget_layout_inline_style_form`}>
        <h3>
          Inline Style
          <a
            onClick={() =>
              onChange({
                ...widget,
                inlineStyle: ""
              })
            }
          >
            Clear
          </a>
        </h3>
        <TextareaAutosize
          value={widget.inlineStyle}
          placeholder={"define your custom styles here..."}
          onChange={ev =>
            onChange({
              ...widget,
              inlineStyle: ev.target.value
            })
          }
        />
      </div>
    );
  }
}
