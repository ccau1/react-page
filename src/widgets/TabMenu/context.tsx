/**
 * @class Page
 */

import * as React from "react";
const TabMenuContext = React.createContext({});

export type TabMenuProviderProps = {
  page: Page;
  children: any;
};

export type TabMenuProviderState = {
  tabPositions: { [tabId: string]: number };
  setTabPosition: { (tabId: string, position: number): void };
  getTabPosition: { (tabId: string): number };
};

class TabMenuProvider extends React.PureComponent<TabMenuProviderProps> {
  state: TabMenuProviderState = {
    tabPositions: {},
    setTabPosition: (tabId: string, position: number): void => {
      this.setState({
        tabPositions: {
          ...this.state.tabPositions,
          [tabId]: position
        }
      });
    },
    getTabPosition: (tabId: string): number => {
      return this.state.tabPositions[tabId] || 0;
    }
  };

  render() {
    return (
      <TabMenuContext.Provider value={this.state}>
        <React.Fragment>{this.props.children}</React.Fragment>
      </TabMenuContext.Provider>
    );
  }
}

export default {
  ...TabMenuContext,
  Provider: TabMenuProvider,
  inject: (Comp: React.FunctionComponent<any>) => (props: any) => (
    <TabMenuContext.Consumer>
      {(value: TabMenuProviderState) => <Comp {...props} context={value} />}
    </TabMenuContext.Consumer>
  )
};
