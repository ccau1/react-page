/**
 * @class TabContentOverview
 */

import * as React from "react";
import { PageEditorWidgetsOverview } from "../../pageEditor/PageEditorWidgetsOverview";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../../contexts/WidgetFormContext";
import { PageEditorWidgetsOverviewWidgetPlaceholderDraggable } from "../../pageEditor/PageEditorWidgetsOverviewWidgetPlaceholder";
import { TabContentDataContent, ITabContentWidget } from ".";
import TabMenuContext, { TabMenuProviderState } from "../TabMenu/context";

// import styles from "./styles.css";

export type TabContentOverviewProps = {
  widget: ITabContentWidget;
  onChange: { (newWidget: ITabContentWidget): void };
};

export default class TabContentOverview extends React.Component<
  TabContentOverviewProps
> {
  render() {
    const { widget, onChange } = this.props;
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <TabMenuContext.Consumer>
            {({ getTabPosition, setTabPosition }: TabMenuProviderState) => {
              const currentTabPosition = getTabPosition(widget.data.tabId);
              const tabPositionContent =
                widget.data.contents[currentTabPosition];

              return (
                <div className="widget_tab_content_overview">
                  <label>Tab Content ({widget.data.tabId})</label>
                  <div className={`widget_tab_content_overview_tab_items`}>
                    {widget.data.contents.map(
                      (
                        content: { id: string; widgets: Widget[] },
                        contentIndex: number
                      ) => (
                        <div
                          key={contentIndex}
                          onClick={ev => {
                            ev.stopPropagation();
                            setTabPosition(widget.data.tabId, contentIndex);
                          }}
                          className={`widget_tab_content_overview_tab_item ${
                            currentTabPosition === contentIndex
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {content.id}
                        </div>
                      )
                    )}
                  </div>
                  {Boolean(
                    tabPositionContent && tabPositionContent.widgets.length
                  ) && (
                    <PageEditorWidgetsOverview
                      widgets={tabPositionContent.widgets}
                      onChange={newWidgets =>
                        onChange({
                          ...widget,
                          data: {
                            ...widget.data,
                            contents: widget.data.contents.map(
                              (c: TabContentDataContent, cIndex: number) =>
                                cIndex === currentTabPosition
                                  ? { ...c, widgets: newWidgets }
                                  : c
                            )
                          }
                        })
                      }
                    />
                  )}
                  {Boolean(
                    !tabPositionContent || !tabPositionContent.widgets.length
                  ) && (
                    <PageEditorWidgetsOverviewWidgetPlaceholderDraggable
                      parentWidgets={tabPositionContent.widgets}
                      onParentWidgetsChange={(newWidgets: Widget[]): void => {
                        onChange({
                          ...widget,
                          data: {
                            ...widget.data,
                            contents: widget.data.contents.map(
                              (c: TabContentDataContent, cIndex: number) =>
                                cIndex === currentTabPosition
                                  ? { ...c, widgets: newWidgets }
                                  : c
                            )
                          }
                        });
                      }}
                      onAdd={(newWidget: Widget): void => {
                        onChange({
                          ...widget,
                          data: {
                            ...widget.data,
                            contents: widget.data.contents.map(
                              (c: TabContentDataContent, cIndex: number) =>
                                cIndex === currentTabPosition
                                  ? {
                                      ...c,
                                      widgets: [
                                        ...tabPositionContent.widgets,
                                        newWidget
                                      ]
                                    }
                                  : c
                            )
                          }
                        });
                        openForm(newWidget._id);
                      }}
                    />
                  )}
                </div>
              );
            }}
          </TabMenuContext.Consumer>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
