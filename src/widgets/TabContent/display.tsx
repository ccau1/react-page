/**
 * @class TabContentDisplay
 */

import * as React from "react";
import TabMenuContext, { TabMenuProviderState } from "../TabMenu/context";
import { PageEditorWidgets } from "../../pageEditor/PageEditorWidgets";
import { ITabContentWidget } from ".";

export type TabContentDisplayProps = { widget: ITabContentWidget };

export default class TabContentDisplay extends React.Component<
  TabContentDisplayProps
> {
  render() {
    const {
      widget: {
        data: { tabId, contents }
      }
    } = this.props;

    return (
      <TabMenuContext.Consumer>
        {({ getTabPosition }: TabMenuProviderState) => {
          if (!contents || !contents.length) return null;
          let tabPosition = getTabPosition(tabId);
          if (!tabPosition) {
            tabPosition = 0;
          } else if (tabPosition > contents.length - 1) {
            tabPosition = contents.length - 1;
          }

          return (
            <PageEditorWidgets
              onChange={() => true}
              widgets={contents[tabPosition].widgets}
            />
          );
        }}
      </TabMenuContext.Consumer>
    );
  }
}
