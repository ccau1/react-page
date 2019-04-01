/**
 * @class TabContentEditor
 */

import * as React from "react";
import TabMenuContext, { TabMenuProviderState } from "../TabMenu/context";
import { PageEditorWidgets } from "../../pageEditor/PageEditorWidgets";
import { TabContentDataContent, ITabContentWidget } from ".";

export type TabContentEditorProps = {
  widget: ITabContentWidget;
  onChange: { (newWidget: ITabContentWidget): void };
};

export default class TabContentEditor extends React.Component<
  TabContentEditorProps
> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { tabId, contents }
    } = widget;

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
              onChange={(newWidgets: Widget[]) =>
                onChange({
                  ...widget,
                  data: {
                    ...widget.data,
                    contents: widget.data.contents.map(
                      (o: TabContentDataContent, oIndex: number) =>
                        oIndex === tabPosition
                          ? { ...o, widgets: newWidgets }
                          : o
                    )
                  }
                })
              }
              widgets={contents[tabPosition].widgets}
            />
          );
        }}
      </TabMenuContext.Consumer>
    );
  }
}
