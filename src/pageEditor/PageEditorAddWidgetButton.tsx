/**
 * @class PageEditorAddWidgetButtons
 */

import * as React from "react";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../contexts/WidgetFormContext";
import WidgetListModalContext, {
  WidgetListModalProviderState
} from "../contexts/WidgetListModalContext";

export type PageEditorAddWidgetButtonProps = {
  onCreate: { (newWidget: Widget): void };
};

export type PageEditorAddWidgetButtonState = {
  isListModalOpen: boolean;
};

export class PageEditorAddWidgetButton extends React.Component<
  PageEditorAddWidgetButtonProps
> {
  render() {
    return (
      <WidgetListModalContext.Consumer>
        {({ openList, closeList }: WidgetListModalProviderState) => (
          <WidgetFormContext.Consumer>
            {({ openForm }: WidgetFormProviderState) => (
              <div className={`page_editor_add_widget_button_container`}>
                <button
                  className={`page_editor_add_widget_button_container`}
                  onClick={() => {
                    openList(widgetType => {
                      const newWidget = widgetType.new();
                      this.props.onCreate(newWidget);
                      closeList();
                      openForm(newWidget._id);
                    });
                  }}
                >
                  Add Widget
                </button>
              </div>
            )}
          </WidgetFormContext.Consumer>
        )}
      </WidgetListModalContext.Consumer>
    );
  }
}
