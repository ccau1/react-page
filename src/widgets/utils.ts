import { widgets as widgetTypes } from "./";
import ObjectID from "bson-objectid";

export const defaultWidgetLayout: Layout = {
  marginUnit: "px",
  paddingUnit: "px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "0",
  marginLeft: "0",
  paddingTop: "0",
  paddingRight: "0",
  paddingBottom: "0",
  paddingLeft: "0",
  backgroundType: "color",
  backgroundColor: "transparent",
  backgroundUri: "",
  backgroundSize: "cover"
};

export const newID = (): string => {
  return new ObjectID().toHexString();
};

export const newWidget = (obj?: any): Widget => {
  return {
    _id: newID(),
    position: "",
    inlineStyle: "",
    userPermission: {
      delete: true,
      edit: true,
      move: true
    },
    hidden: false,
    mobileHidden: false,
    anchor: {
      hash: "",
      top: 0
    },
    layout: {},
    type: "",
    data: {},
    ...obj
  };
};

export const getWidget = (
  widgets: Widget[],
  widgetId: string
): Widget | null => {
  for (const widget of widgets) {
    if (widget._id === widgetId) {
      return widget;
    }
    const widgetType = widgetTypes[widget.type];
    if (widgetType && widgetType.getWidget) {
      const widgetFound = widgetType.getWidget(widget, widgetId);
      if (widgetFound) {
        return widgetFound;
      }
    }
  }
  return null;
};

export const getWidgetLayoutStyle = (widget: Widget): any => {
  if (!widget || !widget.layout) {
    return {};
  }
  const layout = {
    ...defaultWidgetLayout,
    ...widget.layout
  };

  const curatedStyle: React.CSSProperties = {
    marginTop: `${layout.marginTop}${layout.marginUnit}`,
    marginRight: `${layout.marginRight}${layout.marginUnit}`,
    marginBottom: `${layout.marginBottom}${layout.marginUnit}`,
    marginLeft: `${layout.marginLeft}${layout.marginUnit}`,

    paddingTop: `${layout.paddingTop}${layout.paddingUnit}`,
    paddingRight: `${layout.paddingRight}${layout.paddingUnit}`,
    paddingBottom: `${layout.paddingBottom}${layout.paddingUnit}`,
    paddingLeft: `${layout.paddingLeft}${layout.paddingUnit}`
  };
  if (layout.backgroundType === "color") {
    curatedStyle.backgroundColor = layout.backgroundColor;
  } else if (layout.backgroundType === "uri") {
    curatedStyle.background = `url(${
      layout.backgroundUri
    }) no-repeat center center fixed`;
    curatedStyle.backgroundSize = layout.backgroundSize;
  }
  return curatedStyle;
};

export const widgetsTransform = (
  widgets: Widget[],
  // if return object is null, that means delete
  transformFn: { (widget: Widget, stopSearch: { (): void }): Widget | null },
  widgetTypes: {
    [key: string]: WidgetIndex;
  },
  transformArrayFn?: {
    (widgets: Widget[], stopSearch: { (): void }): Widget[];
  }
): Widget[] => {
  // indicator for whether tree loop can be stopped
  let shouldStop = false;
  // give control for user to transform widgets as well
  if (transformArrayFn) {
    widgets = transformArrayFn(widgets, () => {
      shouldStop = true;
    });
  }
  // looping from last to avoid
  // delete affecting rest of loop
  for (let i = widgets.length - 1; i >= 0; i--) {
    const transformResult: Widget | null = transformFn(widgets[i], () => {
      // set stop looping to true
      shouldStop = true;
    });
    //
    if (transformResult === null) {
      // if transformResult is null, that means delete widget
      widgets.splice(i, 1);
    } else {
      // if transformResult is not null, that means update widget
      widgets[i] = transformResult;
    }
    // if shouldStop, return widgets now
    if (shouldStop) {
      return widgets;
    }
    // if widget has not been deleted, continue
    if (widgets[i]) {
      // get wigetType from wiget
      const widgetType = widgetTypes[widgets[i].type];
      // if widget has method transformSubWidgets, call it
      if (widgetType && widgetType.transformSubWidgets) {
        widgets[i] = widgetType.transformSubWidgets(
          widgets[i],
          transformFn,
          widgetTypes,
          transformArrayFn
        );
      }
    }
  }
  return widgets;
};
