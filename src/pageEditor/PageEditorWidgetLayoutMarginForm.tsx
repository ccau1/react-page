/**
 * @class PageEditorWidgetLayoutMarginForms
 */

import * as React from "react";
import { defaultWidgetLayout } from "../widgets/utils";

export type PageEditorWidgetLayoutMarginFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidgetLayoutMarginForm extends React.Component<
  PageEditorWidgetLayoutMarginFormProps
> {
  render() {
    const { widget, onChange } = this.props;
    if (!widget) {
      return <div>no widget selected</div>;
    }

    const layout = {
      ...defaultWidgetLayout,
      ...widget.layout
    };

    return (
      <div className={`page_editor_widget_layout_margin_form`}>
        <h3>
          Margin{" "}
          <select
            value={layout.marginUnit}
            onChange={ev =>
              onChange({
                ...widget,
                layout: { ...layout, marginUnit: ev.target.value }
              })
            }
          >
            <option value="px">px</option>
            <option value="%">%</option>
          </select>
          <a
            onClick={() =>
              onChange({
                ...widget,
                layout: {
                  ...layout,
                  marginTop: "0",
                  marginRight: "0",
                  marginBottom: "0",
                  marginLeft: "0",
                  marginUnit: "px"
                }
              })
            }
          >
            Clear
          </a>
        </h3>
        <div className={`edge_input_container`}>
          <input
            className={`edge_top`}
            type="text"
            placeholder={"Top"}
            value={layout.marginTop}
            onChange={ev => {
              const value = ev.target.value.replace(/[^0-9.]/g, "");
              if (value === "" || !isNaN(parseFloat(value))) {
                onChange({
                  ...widget,
                  layout: { ...layout, marginTop: value }
                });
              }
            }}
          />
          <input
            className={`edge_right`}
            type="text"
            placeholder={"Right"}
            value={layout.marginRight}
            onChange={ev => {
              const value = ev.target.value.replace(/[^0-9.]/g, "");
              if (value === "" || !isNaN(parseFloat(value))) {
                onChange({
                  ...widget,
                  layout: { ...layout, marginRight: value }
                });
              }
            }}
          />
          <input
            className={`edge_bottom`}
            type="text"
            placeholder={"Bottom"}
            value={layout.marginBottom}
            onChange={ev => {
              const value = ev.target.value.replace(/[^0-9.]/g, "");
              if (value === "" || !isNaN(parseFloat(value))) {
                onChange({
                  ...widget,
                  layout: { ...layout, marginBottom: value }
                });
              }
            }}
          />
          <input
            className={`edge_left`}
            type="text"
            placeholder={"Left"}
            value={layout.marginLeft}
            onChange={ev => {
              const value = ev.target.value.replace(/[^0-9.]/g, "");
              if (value === "" || !isNaN(parseFloat(value))) {
                onChange({
                  ...widget,
                  layout: { ...layout, marginLeft: value }
                });
              }
            }}
          />
        </div>
      </div>
    );
  }
}
