/**
 * @class Page
 */

import * as React from "react";

const HoverContext = React.createContext({});

export type HoverProviderProps = {
  children: any;
};

export type HoverProviderState = {
  widgetHovers: Array<string>;
  addWidgetHover: { (widgetId: string): void };
  removeWidgetHover: { (widgetId: string): void };
  isWidgetInactive: { (widgetId: string): boolean };
};

class HoverProvider extends React.PureComponent<HoverProviderProps> {
  // using a variable outside of state because setState
  // messes up when triggers too fast
  _widgetHovers: string[] = [];

  state: HoverProviderState = {
    widgetHovers: [],
    addWidgetHover: widgetId => {
      // get existing widget index
      const widgetIndex = this._widgetHovers.indexOf(widgetId);
      // if widget doesn't exist, add it
      if (widgetIndex === -1) {
        // append new widgetId to end of widget hovers
        this._widgetHovers = [...this._widgetHovers, widgetId];
        // update state with new widget hovers array
        this.setState({
          widgetHovers: this._widgetHovers
        });
      }
    },
    removeWidgetHover: widgetId => {
      // get existing widget index
      const widgetIndex = this._widgetHovers.indexOf(widgetId);
      // if widget exists, remove it
      if (widgetIndex > -1) {
        // remove widgetId at index
        this._widgetHovers.splice(widgetIndex, 1);
        // update state with new widget hovers array
        this.setState({
          widgetHovers: [...this._widgetHovers]
        });
      }
    },
    isWidgetInactive: widgetId => {
      return Boolean(
        this._widgetHovers.length && !this._widgetHovers.includes(widgetId)
      );
    }
  };

  render() {
    return (
      <HoverContext.Provider value={this.state}>
        <React.Fragment>{this.props.children}</React.Fragment>
      </HoverContext.Provider>
    );
  }
}

export default {
  ...HoverContext,
  Provider: HoverProvider,
  inject: (Comp: React.FunctionComponent<any>) => (props: any) => (
    <HoverContext.Consumer>
      {(value: HoverProviderState) => <Comp {...props} context={value} />}
    </HoverContext.Consumer>
  )
};
