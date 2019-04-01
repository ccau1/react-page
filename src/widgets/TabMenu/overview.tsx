/**
 * @class TabMenuOverview
 */

import * as React from "react";
import { ITabMenuWidget } from ".";

// import styles from "./styles.css";

export type TabMenuOverviewProps = {
  widget: ITabMenuWidget;
  onChange: { (newWidget: ITabMenuWidget): void };
};

export default class TabMenuOverview extends React.Component<
  TabMenuOverviewProps
> {
  render() {
    const { widget } = this.props;
    return (
      <div className="widget_tab_content_overview">
        <label>Tab Menu ({widget.data.tabId})</label>
      </div>
    );
  }
}
