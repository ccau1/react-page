/**
 * @class PageEditorWidgetLayoutBackgroundForms
 */

import * as React from "react";
import { defaultWidgetLayout } from "../widgets/utils";
// import { SketchPicker } from "react-color";
import ColorSwatchButton from "../components/ColorSwatchButton";
// import { widgets } from "../widgets";

// import styles from "./styles.css";

export type PageEditorWidgetLayoutBackgroundFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidgetLayoutBackgroundForm extends React.Component<
  PageEditorWidgetLayoutBackgroundFormProps
> {
  render() {
    const { widget, onChange } = this.props;
    if (!widget) {
      return <div>no widget selected</div>;
    }

    const layout: Layout = {
      ...defaultWidgetLayout,
      ...widget.layout
    };

    return (
      <div className={`page_editor_widget_layout_background_form`}>
        <h3>
          Background
          <a
            onClick={() =>
              onChange({
                ...widget,
                layout: {
                  ...layout,
                  backgroundType: "color",
                  backgroundColor: "transparent",
                  backgroundSize: "cover",
                  backgroundUri: ""
                }
              })
            }
          >
            Clear
          </a>
        </h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label style={{ margin: "0 10px 0 0" }}>
            <input
              type="radio"
              name="backgroundType"
              value="color"
              checked={layout.backgroundType === "color"}
              onChange={() =>
                onChange({
                  ...widget,
                  layout: { ...layout, backgroundType: "color" }
                })
              }
            />{" "}
            color
          </label>
          <label style={{ margin: "0 10px 0 0" }}>
            <input
              type="radio"
              name="backgroundType"
              value="uri"
              checked={layout.backgroundType === "uri"}
              onChange={() =>
                onChange({
                  ...widget,
                  layout: { ...layout, backgroundType: "uri" }
                })
              }
            />{" "}
            uri
          </label>
        </div>
        {layout.backgroundType === "color" && (
          <div className={`form_field_horizontal`}>
            <label>Background Color: </label>
            <ColorSwatchButton
              color={layout.backgroundColor || "#transparent"}
              onChange={color =>
                onChange({
                  ...widget,
                  layout: {
                    ...layout,
                    backgroundColor: color
                  }
                })
              }
            />
          </div>
        )}
        {layout.backgroundType === "uri" && (
          <div>
            <div className={`form_field_horizontal`}>
              <label>URI:</label>
              <input
                type="text"
                value={layout.backgroundUri}
                placeholder={"Image URI"}
                onChange={ev =>
                  onChange({
                    ...widget,
                    layout: { ...layout, backgroundUri: ev.target.value }
                  })
                }
              />
            </div>
            <div className={`form_field_horizontal`}>
              <label>Size:</label>
              <select
                value={layout.backgroundSize}
                onChange={ev =>
                  onChange({
                    ...widget,
                    layout: { ...layout, backgroundSize: ev.target.value }
                  })
                }
              >
                <option value="cover">cover</option>
                <option value="contain">contain</option>
              </select>
            </div>
          </div>
        )}
      </div>
    );
  }
}
