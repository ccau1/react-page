/**
 * @class PageEditorWidgetsOverview
 */

import * as React from "react";

import { PageEditorWidgetsOverviewWidgetDraggable } from "./PageEditorWidgetsOverviewWidget";
import {
  DropTarget,
  DropTargetMonitor,
  DropTargetConnector,
  DndComponentClass
} from "react-dnd";

export type PageEditorWidgetsOverviewProps = {
  widgets: Widget[];
  onChange: { (newWidgets: Widget[]): void };
};

export class PageEditorWidgetsOverview extends React.Component<
  PageEditorWidgetsOverviewProps
> {
  render() {
    const { widgets, onChange } = this.props;
    console.log("page editor widgets overview", widgets);

    return (
      <div className={`page_editor_widgets_overview`}>
        {widgets.map((widget, widgetIndex) => (
          <PageEditorWidgetsOverviewWidgetDraggable
            key={widgetIndex}
            widget={widget}
            onChange={(newWidget: Widget) => {
              const newWidgets = [...widgets];
              newWidgets[widgetIndex] = newWidget;
              onChange(newWidgets);
            }}
          />
        ))}
      </div>
    );
  }
}

export const PageEditorWidgetsOverviewDroppable: DndComponentClass<
  any
> = DropTarget(
  ["overview_widget"],
  {
    canDrop: () =>
      // props: PageEditorWidgetsOverviewProps,
      // monitor: DropTargetMonitor
      {
        return true;
      }
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    };
  }
)(PageEditorWidgetsOverview);
