/**
 * @class PageEditorWidgetsOverviewWidget
 */

import * as React from "react";
import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DndComponentClass
} from "react-dnd";

import { widgets as widgetTypes } from "../widgets";

import HoverContext, { HoverProviderState } from "../contexts/HoverContext";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../contexts/WidgetFormContext";

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
> = DragSource(
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
    connectDragSource: any;
    isDragging: boolean;
    children: any;
    widget: Widget;
    onChange: { (newWidget: Widget): void };
  }> {
    render() {
      const { connectDragSource, isDragging, ...rest } = this.props;
      console.log("isDragging", isDragging, connectDragSource);

      return connectDragSource(
        <div style={{ opacity: isDragging ? 0.5 : 1 }}>
          <PageEditorWidgetsOverviewWidget {...rest} />
        </div>
      );
    }
  }
);
