/**
 * @class LayoutBuilderOverview
 */

import * as React from "react";
import { PageEditorWidgetsOverview } from "../../pageEditor/PageEditorWidgetsOverview";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../../contexts/WidgetFormContext";
import { PageEditorWidgetsOverviewWidgetPlaceholderDraggable } from "../../pageEditor/PageEditorWidgetsOverviewWidgetPlaceholder";

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
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <div className="widget_layoutBuilder_overview">
            {Array.from(
              Array(
                widget.data.columns !== "" ? parseInt(widget.data.columns) : 0
              ).keys()
            ).map(column => {
              const columnWidgets = widget.data.widgets[column];

              return (
                <div
                  key={column}
                  className={`widget_layout_builder_overview_column`}
                  style={{
                    width: `${widget.data.columnWidths[column]}%`
                  }}
                >
                  {Boolean(columnWidgets && columnWidgets.length) && (
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
                  )}
                  {Boolean(!columnWidgets || !columnWidgets.length) && (
                    <PageEditorWidgetsOverviewWidgetPlaceholderDraggable
                      parentWidgets={columnWidgets}
                      onParentWidgetsChange={(newWidgets: Widget[]): void => {
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
                      onAdd={(newWidget: Widget): void => {
                        onChange({
                          ...widget,
                          data: {
                            ...widget.data,
                            widgets: {
                              ...widget.data.widgets,
                              [column]: [newWidget]
                            }
                          }
                        });
                        openForm(newWidget._id);
                      }}
                    />
                  )}
                </div>
              );
            })}
            <div style={{ clear: "both" }} />
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
