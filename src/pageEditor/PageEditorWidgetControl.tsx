/**
 * @class PageEditorWidgetControls
 */

import * as React from "react";
import { widgets } from "../widgets";
import HoverContext, { HoverProviderState } from "../contexts/HoverContext";

// import styles from "./styles.css";

export type PageEditorWidgetControlProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidgetControl extends React.Component<
  PageEditorWidgetControlProps
> {
  render() {
    const { widget, onChange } = this.props;
    console.log("PageEditorWidgetControl", widget);
    if (!widget) {
      return null;
    }
    const widgetControl = widgets[widget.type];
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
            <WidgetEditorControl widget={widget} onChange={onChange} />
          </div>
        )}
      </HoverContext.Consumer>
    );
  }
}
