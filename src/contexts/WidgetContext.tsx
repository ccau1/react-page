/**
 * @class Page
 */

import * as React from "react";
import { widgets as widgetTypes } from "../widgets";
import { widgetsTransform } from "../widgets/utils";

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
  deleteWidget: { (widgetId: string): void };
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
    deleteWidget: (widgetId: string): void => {
      const newWidgets = widgetsTransform(
        [...this.props.widgets],
        (widget_: Widget, stopSearch: { (): void }): Widget | null => {
          console.log("deleting transformFn", widget_);

          if (widget_._id === widgetId) {
            stopSearch();
            return null;
          }
          return widget_;
        },
        this.state.widgetTypes
      );

      this.props.onWidgetsChange(newWidgets);
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
  inject: (Comp: React.FunctionComponent<any>) => (props: any) => (
    <WidgetContext.Consumer>
      {(value: WidgetProviderState) => <Comp {...props} context={value} />}
    </WidgetContext.Consumer>
  )
};
