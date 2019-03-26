/**
 * @class LayoutBuilderEditor
 */

import * as React from "react";
import { PageEditorWidgets } from "../../pageEditor/PageEditorWidgets";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../../contexts/WidgetFormContext";

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

    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <div
            className={`widget_layout_builder_editor`}
            onClick={() => {
              console.log("clicked layout builder editor");

              openForm(widget._id, onChange);
            }}
          >
            {Array.from(
              Array(
                widget.data.columns === "" ? 0 : parseInt(widget.data.columns)
              ).keys()
            ).map(column => (
              <div
                key={column}
                className={"widget_layout_builder_editor_column"}
                style={{
                  width: `${widget.data.columnWidths[column]}%`
                }}
              >
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
            <div style={{ clear: "both" }} />
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
