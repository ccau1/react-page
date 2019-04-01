/**
 * @class TextEditorControl
 */

import * as React from "react";
import { IListWidget, ListDataType } from ".";

export type TextEditorControlProps = {
  widget: IListWidget;
  onChange: { (newWidget: Widget): void };
};

export default class TextEditorControl extends React.Component<
  TextEditorControlProps
> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { type }
    } = widget;

    return (
      <div>
        <select
          value={type}
          onClick={ev => ev.stopPropagation()}
          onChange={ev =>
            onChange({
              ...widget,
              data: { ...widget.data, type: ev.target.value as ListDataType }
            })
          }
        >
          <option value="circle">Circle</option>
          <option value="square">Square</option>
          <option value="numeric">Numeric</option>
          <option value="upper-roman">Roman</option>
          <option value="lower-roman">Lower Roman</option>
          <option value="upper-alpha">Alpha</option>
          <option value="lower-alpha">Lower Alpha</option>
        </select>
      </div>
    );
  }
}
