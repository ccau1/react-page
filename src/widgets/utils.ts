import { widgets as widgetTypes } from "./";

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
  backgroundColor: "#fff",
  backgroundUri: "",
  backgroundSize: "cover"
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
  transformFn: { (widget: Widget, stopSearch: { (): void }): Widget },
  widgetTypes: {
    [key: string]: WidgetIndex;
  }
): Widget[] => {
  // indicator for whether tree loop can be stopped
  let shouldStop = false;
  for (let i = 0; i < widgets.length; i++) {
    widgets[i] = transformFn(widgets[i], () => {
      // set stop looping to true
      shouldStop = true;
    });
    // if shouldStop, return widgets now
    if (shouldStop) {
      return widgets;
    }
    // get wigetType from wiget
    const widgetType = widgetTypes[widgets[i].type];
    // if widget has method transformSubWidgets, call it
    if (widgetType && widgetType.transformSubWidgets) {
      widgets[i] = widgetType.transformSubWidgets(
        widgets[i],
        transformFn,
        widgetTypes
      );
    }
  }
  return widgets;
};
