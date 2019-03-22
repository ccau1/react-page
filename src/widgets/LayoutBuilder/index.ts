import ObjectID from "bson-objectid";
import editor from "./editor";
import display from "./display";
import overview from "./overview";
import { getWidget, widgetsTransform } from "../utils";

export default {
  key: "layoutBuilder",
  name: "Layout Builder",
  editor,
  display,
  overview,
  new: (obj?: Widget): Widget => {
    return {
      _id: new ObjectID().toHexString(),
      idx: undefined,
      layout: {
        marginUnit: "px",
        paddingUnit: "px",
        marginTop: "0",
        marginRight: "0",
        marginBottom: "0",
        marginLeft: "0",
        paddingTop: "30",
        paddingRight: "30",
        paddingBottom: "30",
        paddingLeft: "30"
      },
      inlineStyle: "",
      userPermission: {
        delete: true,
        edit: true,
        move: true
      },
      hidden: false,
      mobileHidden: false,
      anchor: {
        hash: "about",
        top: 0
      },
      type: "layoutBuilder",
      data: {
        columns: 3,
        widgets: {}
      },
      ...obj
    };
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
    widgetTypes: { [type: string]: WidgetIndex }
  ): Widget => {
    // indicator for whether tree loop can be stopped
    let shouldStop = false;
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
        widgetTypes
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
