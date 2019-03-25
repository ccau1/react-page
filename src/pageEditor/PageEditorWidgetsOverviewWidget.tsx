/**
 * @class PageEditorWidgetsOverviewWidget
 */

import * as React from "react";
import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DndComponentClass,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetConnector,
  DropTarget,
  DropTargetMonitor,
  XYCoord
} from "react-dnd";

import { widgets as widgetTypes } from "../widgets";

import HoverContext, { HoverProviderState } from "../contexts/HoverContext";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../contexts/WidgetFormContext";
import { findDOMNode } from "react-dom";

export type PageEditorWidgetsOverviewWidgetProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidgetsOverviewWidget extends React.Component<
  PageEditorWidgetsOverviewWidgetProps
> {
  render() {
    const { widget, onChange } = this.props;
    console.log("page editor widget overview", widget);

    const widgetDef = widgetTypes[widget.type];
    const display =
      widgetDef && widgetDef.overview
        ? React.createElement(widgetDef.overview, {
            widget,
            onChange: (newWidget: Widget) => {
              onChange(newWidget);
            }
          })
        : widgetDef.name;
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <HoverContext.Consumer>
            {({
              widgetHovers,
              addWidgetHover,
              removeWidgetHover
            }: HoverProviderState) => (
              <div
                className={`page_editor_widgets_overview_widget${
                  widgetHovers.includes(widget._id) ? " hover" : ""
                }`}
                onMouseEnter={() => addWidgetHover(widget._id)}
                onMouseLeave={() => removeWidgetHover(widget._id)}
                onClick={ev => {
                  ev.stopPropagation();
                  console.log("clicked", widget.type);
                  openForm(widget._id, newWidget => {
                    console.log("openForm change", newWidget, onChange);
                    onChange(newWidget);
                  });
                }}
              >
                {display}
              </div>
            )}
          </HoverContext.Consumer>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}

export const PageEditorWidgetsOverviewWidgetDraggable: DndComponentClass<
  any
> = DropTarget(
  "overview_widget",
  {
    hover: (
      props: PageEditorWidgetsOverviewWidgetProps,
      monitor: DropTargetMonitor,
      component: PageEditorWidgetsOverviewWidget | null
    ): void => {
      if (!component) {
        return;
      }
      const dragWidget = monitor.getItem().widget;
      const hoverWidget = props.widget;

      // Don't replace items with themselves
      if (dragWidget._id === hoverWidget._id) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = (findDOMNode(
        component
      ) as Element).getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      console.log(
        "hovering",
        hoverMiddleY,
        hoverClientY,
        clientOffset,
        hoverWidget,
        dragWidget
      );

      // // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }

      // // Dragging upwards
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return;
      // }

      // // Time to actually perform the action
      // props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // monitor.getItem().widget = hoverWidget;
    }
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    "overview_widget",
    {
      beginDrag: (props: PageEditorWidgetsOverviewWidgetProps) => {
        return { widget: props.widget };
      }
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(
    class PageEditorWidgetsOverviewWidgetDraggableWrapper extends React.Component<{
      connectDragSource: ConnectDragSource;
      connectDropTarget: ConnectDropTarget;
      isDragging: boolean;
      children: any;
      widget: Widget;
      onChange: { (newWidget: Widget): void };
    }> {
      render() {
        const {
          connectDragSource,
          connectDropTarget,
          isDragging,
          ...rest
        } = this.props;
        console.log("isDragging", isDragging, connectDragSource);

        return connectDragSource(
          connectDropTarget!(
            <div style={{ opacity: isDragging ? 0.5 : 1 }}>
              <PageEditorWidgetsOverviewWidget {...rest} />
            </div>
          )
        );
      }
    }
  )
);
