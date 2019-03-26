/**
 * @class PageEditorWidgetLayoutPaddingForms
 */

import * as React from "react";
import { defaultWidgetLayout } from "../widgets/utils";

export type PageEditorWidgetLayoutPaddingFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidgetLayoutPaddingForm extends React.Component<
  PageEditorWidgetLayoutPaddingFormProps
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
      <div className={`page_editor_widget_layout_padding_form`}>
        <h3>
          Padding{" "}
          <select
            value={layout.paddingUnit}
            onChange={ev =>
              onChange({
                ...widget,
                layout: { ...layout, paddingUnit: ev.target.value }
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
                  paddingTop: "0",
                  paddingRight: "0",
                  paddingBottom: "0",
                  paddingLeft: "0",
                  paddingUnit: "px"
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
            value={layout.paddingTop}
            onChange={ev => {
              const value = ev.target.value.replace(/[^0-9.]/g, "");
              if (value === "" || !isNaN(parseFloat(value))) {
                onChange({
                  ...widget,
                  layout: { ...layout, paddingTop: value }
                });
              }
            }}
          />
          <input
            className={`edge_right`}
            type="text"
            placeholder={"Right"}
            value={layout.paddingRight}
            onChange={ev => {
              const value = ev.target.value.replace(/[^0-9.]/g, "");
              if (value === "" || !isNaN(parseFloat(value))) {
                onChange({
                  ...widget,
                  layout: { ...layout, paddingRight: value }
                });
              }
            }}
          />
          <input
            className={`edge_bottom`}
            type="text"
            placeholder={"Bottom"}
            value={layout.paddingBottom}
            onChange={ev => {
              const value = ev.target.value.replace(/[^0-9.]/g, "");
              if (value === "" || !isNaN(parseFloat(value))) {
                onChange({
                  ...widget,
                  layout: { ...layout, paddingBottom: value }
                });
              }
            }}
          />
          <input
            className={`edge_left`}
            type="text"
            placeholder={"Left"}
            value={layout.paddingLeft}
            onChange={ev => {
              const value = ev.target.value.replace(/[^0-9.]/g, "");
              if (value === "" || !isNaN(parseFloat(value))) {
                onChange({
                  ...widget,
                  layout: { ...layout, paddingLeft: value }
                });
              }
            }}
          />
        </div>
      </div>
    );
  }
}
