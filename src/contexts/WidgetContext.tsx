/**
 * @class Page
 */

import * as React from "react";
import { widgets as widgetTypes } from "../widgets";
import { widgetsTransform, newID } from "../widgets/utils";

const WidgetContext = React.createContext({});

export type WidgetProviderProps = {
  widgetTypes: {
    [key: string]: WidgetIndex;
  };
  widgets: Widget[];
  onWidgetsChange: { (newWidgets: Widget[]): void };
  children: any;
};

export type WidgetProviderState = {
  widgetTypes: {
    [key: string]: WidgetIndex;
  };
  setWidgetTypes: { (widgetTypes: { [key: string]: WidgetIndex }): void };
  addWidgetTypes: { (widgetTypes: WidgetIndex[]): void };
  getWidgetTypes: { (): WidgetIndex[] };
  getWidgetTypeByKey: { (key: string): WidgetIndex };

  updateWidget: { (widget: Widget): void };
  moveWidget: {
    (opts: {
      widget: Widget;
      toWidget: Widget;
      isAbove?: boolean;
      add?: boolean;
    }): Widget;
  };
  moveWidgetToList: {
    (widget: Widget, widgets: Widget[], position: number): Widget;
  };
  deleteWidget: { (widgetId: string): Widget | null };
  cloneWidget: {
    (widget: Widget): Widget;
  };
};

class WidgetProvider extends React.PureComponent<WidgetProviderProps> {
  state: WidgetProviderState = {
    // object holding widgetTypes defined by key
    widgetTypes,
    // replace current widgetTypes with new widgetTypes
    setWidgetTypes: (widgetTypes: { [key: string]: WidgetIndex }): void => {
      this.setState({ widgetTypes });
    },
    // add widgetTypes to current object
    addWidgetTypes: (widgetTypes: WidgetIndex[]): void => {
      // clone current widgetTypes
      const newWidgetTypes = { ...this.state.widgetTypes };
      // foreach widgetType coming in, add to cloned widgetTypes by key
      for (const widgetType of widgetTypes) {
        newWidgetTypes[widgetType.key] = widgetType;
      }
      // save new concated widgetTypes
      this.setState({ widgetTypes: newWidgetTypes });
    },
    // get widgetTypes as array
    getWidgetTypes: (): WidgetIndex[] => {
      return Object.values(this.state.widgetTypes);
    },
    // get one widgetType by key
    getWidgetTypeByKey: (key: string): WidgetIndex => {
      return this.state.widgetTypes[key];
    },
    updateWidget: (widget: Widget): void => {
      const newWidgets = widgetsTransform(
        [...this.props.widgets],
        (widget_: Widget, stopSearch: { (): void }): Widget => {
          if (widget_._id === widget._id) {
            stopSearch();
            return widget;
          }
          return widget_;
        },
        this.state.widgetTypes
      );

      this.props.onWidgetsChange(newWidgets);
    },
    deleteWidget: (widgetId: string): Widget | null => {
      let widget = null;
      const newWidgets = widgetsTransform(
        [...this.props.widgets],
        (widget_: Widget, stopSearch: { (): void }): Widget | null => {
          if (widget_._id === widgetId) {
            widget = widget_;
            stopSearch();
            return null;
          }
          return widget_;
        },
        this.state.widgetTypes
      );

      this.props.onWidgetsChange(newWidgets);

      return widget;
    },
    moveWidgetToList: (
      widget: Widget,
      widgets: Widget[],
      position: number
    ): Widget => {
      let _widget = widget;
      let _widgets = widgets;
      let foundWidget = false;
      let foundWidgetsList = false;
      const newWidgets = widgetsTransform(
        [...this.props.widgets],
        (widget_: Widget): Widget | null => {
          return widget_;
        },
        this.state.widgetTypes,
        (widgets: Widget[], stopSearch: { (): void }): Widget[] => {
          let newWidgets = [...widgets];
          // for each widget, starting from the back, either remove if match widget
          // or add to front of toWidget if toWidgetFound
          for (let i = newWidgets.length - 1; i >= 0; i--) {
            if (newWidgets[i]._id === _widget._id) {
              // match widget, remove it
              newWidgets.splice(i, 1);
              foundWidget = true;
            }
          }
          if (widgets === _widgets) {
            foundWidgetsList = true;
            if (
              position &&
              position <= newWidgets.length - 1 &&
              position >= 0
            ) {
              // not end of array, so just plug it in
              newWidgets.splice(position, 0, widget);
            } else {
              // it is at the end of array, we push instead
              newWidgets.push(widget);
            }
          }
          if (foundWidget && foundWidgetsList) {
            stopSearch();
          }
          return newWidgets;
        }
      );

      // update widgets only if both delete and place is successful
      if (foundWidget && foundWidgetsList) {
        this.props.onWidgetsChange(newWidgets);
      }
      // widget.position
      // toWidget.position
      return _widget;
    },
    moveWidget: (opts: {
      widget: Widget;
      toWidget: Widget;
      isAbove?: boolean;
      add?: boolean;
    }): Widget => {
      let _widget = opts.widget;
      let foundWidget = false;
      let foundToWidget = false;
      // remove widget and add it to above toWidget
      const newWidgets = widgetsTransform(
        [...this.props.widgets],
        (widget_: Widget): Widget | null => {
          return widget_;
        },
        this.state.widgetTypes,
        (widgets: Widget[], stopSearch: { (): void }): Widget[] => {
          let newWidgets = [...widgets];
          // const parentPosition = widgets.length
          //   ? widgets[0].position
          //       .split(".")
          //       .slice(0, -1)
          //       .join(".")
          //   : "";
          // for each widget, starting from the back, either remove if match widget
          // or add to front of toWidget if toWidgetFound
          for (let i = newWidgets.length - 1; i >= 0; i--) {
            if (newWidgets[i]._id === _widget._id) {
              // match widget, remove it
              newWidgets.splice(i, 1);
              foundWidget = true;
            } else if (newWidgets[i]._id === opts.toWidget._id) {
              // match toWidget, add widget infront of it
              if (opts.isAbove) {
                // if move to above toWidget, just use i
                newWidgets.splice(i, 0, _widget);
              } else {
                // if move below toWidget, check if i is last position
                if (i === newWidgets.length - 1) {
                  // if last item, do push instead
                  newWidgets.push(_widget);
                } else {
                  // if toWidget item is not last item, just do i+1
                  newWidgets.splice(i + 1, 0, _widget);
                }
              }
              foundToWidget = true;
            }
          }
          if (foundWidget && foundToWidget) {
            stopSearch();
          }
          return newWidgets;
        }
      );

      // update widgets only if both delete and place is successful
      if (opts.add || (foundWidget && foundToWidget)) {
        this.props.onWidgetsChange(newWidgets);
      }
      // widget.position
      // toWidget.position
      return _widget;
    },
    cloneWidget: (widget: Widget): Widget => {
      const widgetType = this.state.widgetTypes[widget.type];
      if (widgetType && widgetType.cloneWidget) {
        console.log("calling widget clone", widget);

        return widgetType.cloneWidget(widget, this.state.widgetTypes);
      } else {
        console.log("just returning new object");
        return { ...widget, _id: newID() };
      }
    }
  };

  constructor(props: WidgetProviderProps) {
    super(props);
    // merge default widgetTypes and outside widgetTypes
    this.state.widgetTypes = { ...widgetTypes, ...props.widgetTypes };
  }

  componentDidUpdate(prevProps: WidgetProviderProps) {
    // if widgetTypes updated, reset widgetTypes with new widgetTypes
    if (this.props.widgetTypes !== prevProps.widgetTypes) {
      this.state.setWidgetTypes({ ...widgetTypes, ...this.props.widgetTypes });
    }
  }

  render() {
    return (
      <WidgetContext.Provider value={this.state}>
        <React.Fragment>{this.props.children}</React.Fragment>
      </WidgetContext.Provider>
    );
  }
}

export default {
  ...WidgetContext,
  Provider: WidgetProvider,
  inject: (Comp: any) => (props: any) => (
    <WidgetContext.Consumer>
      {(value: WidgetProviderState) => <Comp {...props} context={value} />}
    </WidgetContext.Consumer>
  )
};
