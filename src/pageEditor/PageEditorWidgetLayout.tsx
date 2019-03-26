/**
 * @class PageEditorWidgetLayout
 */

import * as React from "react";
import HoverContext, { HoverProviderState } from "../contexts/HoverContext";
import { getWidgetLayoutStyle } from "../widgets/utils";

// import styles from "./styles.css";

export type PageEditorWidgetLayoutProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
  children: any;
};

export type PageEditorWidgetLayoutState = {};

export class PageEditorWidgetLayout extends React.Component<
  PageEditorWidgetLayoutProps
> {
  state: PageEditorWidgetLayoutState = {};

  render() {
    const { widget, children } = this.props;

    return (
      <HoverContext.Consumer>
        {({
          addWidgetHover,
          removeWidgetHover,
          isWidgetInactive
        }: HoverProviderState) => (
          <div
            className={`page_editor_widget_layout page_editor_hoverable${
              isWidgetInactive(widget._id) ? " hover_inactive" : ""
            }`}
            onMouseEnter={() => addWidgetHover(widget._id)}
            onMouseLeave={() => removeWidgetHover(widget._id)}
            style={{ ...getWidgetLayoutStyle(widget) }}
          >
            {children}
          </div>
        )}
      </HoverContext.Consumer>
    );
  }
}
