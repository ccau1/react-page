/**
 * @class LayoutBuilderOverview
 */

import * as React from "react";
import { PageEditorWidgetsOverview } from "../../pageEditor/PageEditorWidgetsOverview";

// import styles from "./styles.css";

export type LayoutBuilderOverviewProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class LayoutBuilderOverview extends React.Component<
  LayoutBuilderOverviewProps
> {
  render() {
    const { widget, onChange } = this.props;
    console.log("LayoutBuilderOverview", widget);

    return (
      <div
        className="widget_layoutBuilder_overview"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {Array.from(Array(widget.data.columns).keys()).map(column => {
          const columnWidgets = widget.data.widgets[column];

          if (!columnWidgets) {
            return null;
          }
          return (
            <div key={column} style={{ flex: 1, position: "relative" }}>
              <PageEditorWidgetsOverview
                widgets={columnWidgets}
                onChange={newWidgets =>
                  onChange({
                    ...widget,
                    data: {
                      ...widget.data,
                      widgets: {
                        ...widget.data.widgets,
                        [column]: newWidgets
                      }
                    }
                  })
                }
              />
            </div>
          );
        })}
      </div>
    );
  }
}
