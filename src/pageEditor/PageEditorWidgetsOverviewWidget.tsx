/**
 * @class PageEditorWidgetsOverviewWidget
 */

import * as React from "react";
import {
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetConnector,
  DropTarget,
  DropTargetMonitor,
  XYCoord
} from "react-dnd";

import HoverContext, { HoverProviderState } from "../contexts/HoverContext";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../contexts/WidgetFormContext";
import { findDOMNode } from "react-dom";
import WidgetContext, { WidgetProviderState } from "../contexts/WidgetContext";

export type PageEditorWidgetsOverviewWidgetProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidgetsOverviewWidget extends React.Component<
  PageEditorWidgetsOverviewWidgetProps
> {
  render() {
    const { widget, onChange } = this.props;
    return (
      <WidgetContext.Consumer>
        {({ widgetTypes }: WidgetProviderState) => {
          const widgetDef = widgetTypes[widget.type];
          let display: React.ComponentElement<any, any> | string | null = null;
          if (widgetDef) {
            display = widgetDef.overview
              ? React.createElement(widgetDef.overview, {
                  widget,
                  onChange: (newWidget: Widget) => {
                    onChange(newWidget);
                  }
                })
              : widgetDef.name;
          }
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
                      onMouseEnter={() => {
                        const widgetDomEle = document.getElementById(
                          `page_editor_widget_${widget._id}`
                        );
                        if (widgetDomEle) {
                          widgetDomEle.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "nearest"
                          });
                        }
                        addWidgetHover(widget._id);
                      }}
                      onMouseLeave={() => removeWidgetHover(widget._id)}
                      onClick={ev => {
                        ev.stopPropagation();
                        openForm(widget._id, onChange);
                      }}
                    >
                      {display}
                    </div>
                  )}
                </HoverContext.Consumer>
              )}
            </WidgetFormContext.Consumer>
          );
        }}
      </WidgetContext.Consumer>
    );
  }
}

export const PageEditorWidgetsOverviewWidgetDraggable: any = WidgetContext.inject(
  DropTarget(
    "overview_widget",
    {
      canDrop: () =>
        // props: PageEditorWidgetsOverviewWidgetProps,
        // monitor: DropTargetMonitor
        {
          return true;
        },
      hover: (
        props: PageEditorWidgetsOverviewWidgetProps & {
          context: WidgetProviderState;
        },
        monitor: DropTargetMonitor,
        component: PageEditorWidgetsOverviewWidget | null
      ): void => {
        if (!component || !monitor.isOver({ shallow: true })) {
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

        const hoverYHeight = hoverBoundingRect.bottom - hoverBoundingRect.top;
        // Get vertical middle of hover item
        const hoverMiddleY = hoverYHeight / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top of drag item
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        // // Time to actually perform the action
        const newDragWidget = props.context.moveWidget(
          dragWidget,
          hoverWidget,
          hoverClientY > hoverMiddleY
        );

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().widget = newDragWidget;
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
  )
);
