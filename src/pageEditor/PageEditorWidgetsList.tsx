/**
 * @class PageEditorWidgetsList
 */

import * as React from "react";
import WidgetContext, { WidgetProviderState } from "../contexts/WidgetContext";

export type PageEditorWidgetsListProps = {
  onSelect: { (widgetType: WidgetIndex): void };
};

export type PageEditorWidgetsListState = {};

export class PageEditorWidgetsList extends React.Component<
  PageEditorWidgetsListProps
> {
  state: PageEditorWidgetsListState = {};

  render() {
    const { onSelect } = this.props;

    return (
      <WidgetContext.Consumer>
        {({ getWidgetTypes }: WidgetProviderState) => (
          <div className={`page_editor_widgets_list`}>
            {getWidgetTypes().map((widgetType: WidgetIndex) => (
              <div
                key={widgetType.key}
                className={`page_editor_widgets_list_item`}
                onClick={() => onSelect(widgetType)}
              >
                {widgetType.name}
              </div>
            ))}
          </div>
        )}
      </WidgetContext.Consumer>
    );
  }
}
