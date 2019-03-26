import editor from "./editor";
import display from "./display";
import overview from "./overview";
import form from "./form";
import { getWidget, widgetsTransform, newWidget } from "../utils";

export default {
  key: "layoutBuilder",
  name: "Layout Builder",
  form,
  editor,
  display,
  overview,
  new: (obj?: Widget): Widget => {
    return newWidget({
      type: "layoutBuilder",
      data: {
        columns: 3,
        columnWidths: { "0": 33.33, "1": 33.33, "2": 33.33 },
        columnRatio: "even",
        widgets: { "0": [], "1": [], "2": [] }
      },
      ...obj
    });
  },
  // this method is for if this widget can have sub-widgets
  getWidget: (widget: Widget, widgetId: string): Widget | null => {
    // if current widget matches, return this one
    if (widget._id === widgetId) {
      return widget;
    }
    // for each of the child widgets array,
    // check if there are matches
    for (const widgets of Object.values(widget.data.widgets as {
      [key: string]: Widget[];
    })) {
      // get widget by widgets
      const widget = getWidget(widgets, widgetId);
      // if widget found, return widget
      if (widget) {
        return widget;
      }
    }
    // if none found, return null
    return null;
  },
  // this method is for if this widget can have sub-widgets
  transformSubWidgets: (
    widget: Widget,
    transformFn: { (widget: Widget, stopSearch?: { (): void }): Widget },
    widgetTypes: { [type: string]: WidgetIndex },
    transformArrayFn?: {
      (widgets: Widget[], stopSearch: { (): void }): Widget[];
    }
  ): Widget => {
    // indicator for whether tree loop can be stopped
    let shouldStop = false;
    // if transformArrayFn sets shouldStop, return object now
    if (shouldStop) {
      return widget;
    }
    // for each of the child widgets array,
    // check if there are matches
    for (let widgetArrayKey of Object.keys(widget.data.widgets)) {
      // get widget by widgets
      widget.data.widgets[widgetArrayKey] = widgetsTransform(
        widget.data.widgets[widgetArrayKey],
        (widget_: Widget, stopSearch?: { (): void }): Widget => {
          return transformFn(widget_, () => {
            shouldStop = true;
            if (stopSearch) {
              stopSearch();
            }
          });
        },
        widgetTypes,
        transformArrayFn
      );
      // if shouldStop, return widget now
      if (shouldStop) {
        return widget;
      }
    }
    // if none found, return null
    return widget;
  }
} as WidgetIndex;
