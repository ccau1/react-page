/**
 * @class PageEditorWidgetsOverview
 */

import * as React from "react";

import { PageEditorWidgetsOverviewWidgetDraggable } from "./PageEditorWidgetsOverviewWidget";
import {
  DropTarget,
  DropTargetMonitor,
  DropTargetConnector,
  DndComponentClass,
  ConnectDropTarget
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

    return (
      <div className={`page_editor_widgets_overview`}>
        {widgets.map((widget, widgetIndex) => (
          <PageEditorWidgetsOverviewWidgetDraggable
            key={widget._id}
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
  ["overview_widget111"],
  {
    canDrop: () =>
      // props: PageEditorWidgetsOverviewProps,
      // monitor: DropTargetMonitor
      {
        return true;
      },
    hover: () => {
      // console.log("overview hover!!!");
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
)(
  class PageEditorWidgetsOverviewDroppableWrapper extends React.Component<
    {
      connectDropTarget: ConnectDropTarget;
      isOver: boolean;
      isOverCurrent: boolean;
      canDrop: boolean;
      itemType: string;
    } & PageEditorWidgetsOverviewProps
  > {
    render() {
      const { connectDropTarget, ...rest } = this.props;
      return connectDropTarget(
        <div>
          <PageEditorWidgetsOverview {...rest} />
        </div>
      );
    }
  }
);
