/**
 * @class LayoutBuilderEditor
 */

import * as React from "react";
import { PageEditorWidgets } from "../../pageEditor/PageEditorWidgets";

// import styles from "./styles.css";

export type LayoutBuilderEditorProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class LayoutBuilderEditor extends React.Component<
  LayoutBuilderEditorProps
> {
  render() {
    const { widget, onChange } = this.props;
    console.log(
      "LayoutBuilderEditor",
      widget,
      widget.data,
      Array.from(Array(widget.data.columns).keys())
    );

    return (
      <div
        className={`widget_layoutBuilder_editor`}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {Array.from(Array(widget.data.columns).keys()).map(column => (
          <div key={column} style={{ flex: 1, position: "relative" }}>
            <PageEditorWidgets
              widgets={widget.data.widgets[column] || []}
              onChange={newWidgets => {
                onChange({
                  ...widget,
                  data: {
                    ...widget.data,
                    widgets: {
                      ...widget.data.widgets,
                      [column]: newWidgets
                    }
                  }
                });
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}
