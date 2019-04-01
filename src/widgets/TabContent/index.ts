import editor from "./editor";
import form from "./form";
import editorControl from "./editorControl";
import display from "./display";
import overview from "./overview";
import { getWidget, newWidget, widgetsTransform, newID } from "../utils";

export type TabContentData = {
  tabId: string;
  horizontal: boolean;
  contents: TabContentDataContent[];
};
export type TabContentDataContent = { id: string; widgets: Widget[] };

export interface ITabContentWidget extends Widget {
  data: TabContentData;
}

export default {
  key: "tabContent",
  name: "Tab Content",
  editor,
  editorControl,
  overview: overview,
  dependencies: ["tabMenu"],
  new: (obj?: Widget): Widget => {
    return newWidget({
      type: "tabContent",
      data: {
        tabId: "topTab",
        contents: [
          {
            id: "truck_management",
            widgets: []
          },
          {
            id: "in_out_order_management",
            widgets: []
          },
          {
            id: "security_process",
            widgets: []
          },
          {
            id: "product_tracking",
            widgets: []
          }
        ]
      },
      ...obj
    });
  },
  form,
  display,
  // this method is for if this widget can have sub-widgets
  getWidget: (widget: Widget, widgetId: string): Widget | null => {
    // if current widget matches, return this one
    if (widget._id === widgetId) {
      return widget;
    }
    console.log("tab content widget", widget);

    // for each of the child widgets array,
    // check if there are matches
    return getWidget(
      widget.data.contents.reduce(
        (arr: Widget[], content: TabContentDataContent) => [
          ...arr,
          ...content.widgets
        ],
        []
      ),
      widgetId
    );
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
    for (let i = widget.data.contents.length - 1; i >= 0; i--) {
      widget.data.contents[i].widgets = widgetsTransform(
        widget.data.contents[i].widgets,
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
    const clonedWidget = {
      ...widget,
      data: { ...widget.data, contents: [...widget.data.contents] },
      _id: newID()
    };

    for (let i = 0; i < clonedWidget.data.contents.length; i++) {
      clonedWidget.data.contents[i].widgets = widgetsTransform(
        [...clonedWidget.data.contents[i].widgets],
        (widget: Widget): Widget => {
          const newWidget = { ...widget, _id: newID() };
          return newWidget;
        },
        widgetTypes
      );
    }

    return clonedWidget;
  }
} as WidgetIndex;
