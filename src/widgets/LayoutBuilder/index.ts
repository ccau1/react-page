import editor from "./editor";
import display from "./display";
import overview from "./overview";
import form from "./form";
import { getWidget, widgetsTransform, newWidget, newID } from "../utils";

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
        direction: "leftToRight",
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
  },
  cloneWidget: (
    widget: Widget,
    widgetTypes: { [key: string]: WidgetIndex }
  ): Widget => {
    console.log("before clone", widget);
    const clonedWidget = {
      ...widget,
      data: { ...widget.data, widgets: { ...widget.data.widgets } },
      _id: newID()
    };

    for (const widgetsKey of Object.keys(clonedWidget.data.widgets)) {
      clonedWidget.data.widgets[widgetsKey] = widgetsTransform(
        [...clonedWidget.data.widgets[widgetsKey]],
        (widget: Widget): Widget => {
          const newWidget = { ...widget, _id: newID() };
          return newWidget;
        },
        widgetTypes
      );
    }
    console.log("cloned widget", clonedWidget);

    return clonedWidget;
  }
} as WidgetIndex;
