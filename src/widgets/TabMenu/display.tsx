/**
 * @class TabMenuDisplay
 */

import * as React from "react";
import { TabMenuDataItem, ITabMenuWidget } from ".";
import TabMenuContext, { TabMenuProviderState } from "./context";
// import styles from "./styles.css";

export type TabMenuDisplayProps = { widget: ITabMenuWidget };

export default class TabMenuDisplay extends React.Component<
  TabMenuDisplayProps
> {
  render() {
    const {
      widget: {
        data: { tabId, items, horizontal, horizontalPosition }
      }
    } = this.props;

    return (
      <TabMenuContext.Consumer>
        {({ getTabPosition, setTabPosition }: TabMenuProviderState) => (
          <div
            className={`widget_tab_menu ${
              horizontal ? "horizontal" : "vertical"
            } ${horizontal ? `horizontal-position-${horizontalPosition}` : ""}`}
          >
            {items.map((item: TabMenuDataItem, itemIndex: number) => (
              <div
                key={itemIndex}
                className={`widget_tab_menu_item ${
                  getTabPosition(tabId) === itemIndex ||
                  (itemIndex === 0 && !getTabPosition(tabId))
                    ? "active"
                    : ""
                }`}
                onClick={ev => {
                  ev.stopPropagation();
                  setTabPosition(tabId, itemIndex);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </TabMenuContext.Consumer>
    );
  }
}
