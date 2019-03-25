/**
 * @class LayoutBuilderOverview
 */

import * as React from "react";
import { PageEditorWidgetsOverview } from "../../pageEditor/PageEditorWidgetsOverview";
import WidgetListModalContext, {
  WidgetListModalProviderState
} from "../../contexts/WidgetListModalContext";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../../contexts/WidgetFormContext";

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
      <WidgetListModalContext.Consumer>
        {({ openList, closeList }: WidgetListModalProviderState) => (
          <WidgetFormContext.Consumer>
            {({ openForm }: WidgetFormProviderState) => (
              <div className="widget_layoutBuilder_overview">
                {Array.from(
                  Array(
                    widget.data.columns !== ""
                      ? parseInt(widget.data.columns)
                      : 0
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
                        <div
                          className={`widget_layout_builder_overview_column_placeholder`}
                          onClick={ev => {
                            ev.stopPropagation();
                            openList(widgetType => {
                              const newWidget = widgetType.new();
                              console.log("YOUUUU");

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
                              closeList();
                              openForm(newWidget._id);
                            });
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
        )}
      </WidgetListModalContext.Consumer>
    );
  }
}
