/**
 * @class PageEditorWidgetsOverviewWidgetPlaceholder
 */

import * as React from "react";
import {
  ConnectDropTarget,
  DropTargetConnector,
  DropTarget,
  DropTargetMonitor
} from "react-dnd";
import WidgetContext, { WidgetProviderState } from "../contexts/WidgetContext";
import WidgetListModalContext, {
  WidgetListModalProviderState
} from "../contexts/WidgetListModalContext";

export type PageEditorWidgetsOverviewWidgetPlaceholderProps = {
  parentWidgets: Widget[];
  onParentWidgetsChange: { (newWidgets: Widget[]): void };
  onAdd: { (newWidget: Widget): void };
};

export class PageEditorWidgetsOverviewWidgetPlaceholder extends React.Component<
  PageEditorWidgetsOverviewWidgetPlaceholderProps
> {
  render() {
    const { onAdd } = this.props;

    return (
      <WidgetListModalContext.Consumer>
        {({ openList, closeList }: WidgetListModalProviderState) => (
          <div
            className={`widget_layout_builder_overview_column_placeholder`}
            onClick={ev => {
              ev.stopPropagation();
              openList(widgetType => {
                const newWidget = widgetType.new();
                onAdd(newWidget);
                closeList();
              });
            }}
          />
        )}
      </WidgetListModalContext.Consumer>
    );
  }
}

export const PageEditorWidgetsOverviewWidgetPlaceholderDraggable: any = WidgetContext.inject(
  DropTarget(
    "overview_widget",
    {
      canDrop: () =>
        // props: PageEditorWidgetsOverviewWidgetPlaceholderProps,
        // monitor: DropTargetMonitor
        {
          return true;
        },
      hover: (
        props: PageEditorWidgetsOverviewWidgetPlaceholderProps & {
          context: WidgetProviderState;
        },
        monitor: DropTargetMonitor,
        component: PageEditorWidgetsOverviewWidgetPlaceholder | null
      ): void => {
        if (!component || !monitor.isOver({ shallow: true })) {
          return;
        }

        const dragWidget = monitor.getItem().widget;

        const newWidget = props.context.moveWidgetToList(
          dragWidget,
          props.parentWidgets,
          props.parentWidgets && props.parentWidgets.length
            ? props.parentWidgets.length
            : 0
        );
        // // remove current position
        // props.context.deleteWidget(dragWidget._id);
        // // add to add button position
        // if (props.onParentWidgetsChange) {
        //   props.onParentWidgetsChange([
        //     ...(props.parentWidgets || []),
        //     dragWidget
        //   ]);
        // }

        // // Note: we're mutating the monitor item here!
        // // Generally it's better to avoid mutations,
        // // but it's good here for the sake of performance
        // // to avoid expensive index searches.
        monitor.getItem().widget = newWidget;
      }
    },
    (connect: DropTargetConnector) => ({
      connectDropTarget: connect.dropTarget()
    })
  )(
    class PageEditorWidgetsOverviewWidgetPlaceholderDraggableWrapper extends React.Component<
      {
        connectDropTarget: ConnectDropTarget;
        isDragging: boolean;
      } & PageEditorWidgetsOverviewWidgetPlaceholderProps
    > {
      render() {
        const { connectDropTarget, isDragging, ...rest } = this.props;

        return connectDropTarget!(
          <div style={{ opacity: isDragging ? 0.5 : 1 }}>
            <PageEditorWidgetsOverviewWidgetPlaceholder {...rest} />
          </div>
        );
      }
    }
  )
);
