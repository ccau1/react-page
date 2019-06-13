/**
 * @class PageEditorWidgetControls
 */

import * as React from "react";
import HoverContext, { HoverProviderState } from "../contexts/HoverContext";
import WidgetContext, { WidgetProviderState } from "../contexts/WidgetContext";

// import styles from "./styles.css";

export type PageEditorWidgetControlProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
  locale: string;
  availableLocales: string[];
};

export class PageEditorWidgetControl extends React.Component<
  PageEditorWidgetControlProps
> {
  render() {
    const { widget, onChange, locale, availableLocales } = this.props;

    if (!widget) {
      return null;
    }
    return (
      <WidgetContext.Consumer>
        {({ widgetTypes }: WidgetProviderState) => {
          const widgetControl = widgetTypes[widget.type];
          if (!widgetControl || !widgetControl.editorControl) {
            return null;
          }
          const WidgetEditorControl = widgetControl.editorControl;

          return (
            <HoverContext.Consumer>
              {({ isWidgetInactive }: HoverProviderState) => (
                <div
                  className={`page_editor_widget_control page_editor_hoverable${
                    isWidgetInactive(widget._id) ? " hover_inactive" : ""
                  }`}
                >
                  <WidgetEditorControl
                    widget={widget}
                    onChange={onChange}
                    locale={locale}
                    availableLocales={availableLocales}
                  />
                </div>
              )}
            </HoverContext.Consumer>
          );
        }}
      </WidgetContext.Consumer>
    );
  }
}
