/**
 * @class PageEditorWidgets
 */

import * as React from "react";
import { PageEditorWidget } from "./PageEditorWidget";

// import styles from "./styles.css";

export type PageEditorWidgetsProps = {
  widgets: Widget[];
  onChange: { (newWidgets: Widget[]): void };
};

export class PageEditorWidgets extends React.Component<PageEditorWidgetsProps> {
  onWidgetChange = (newWidget: Widget, index: number) => {
    const { onChange, widgets } = this.props;
    const newWidgets = [...widgets];
    newWidgets[index] = newWidget;
    onChange(newWidgets);
  };
  render() {
    const { widgets } = this.props;

    return (
      <div>
        {widgets.map((widget, widgetIndex) => (
          <PageEditorWidget
            widget={widget}
            key={widgetIndex}
            onChange={newWidget => this.onWidgetChange(newWidget, widgetIndex)}
          />
        ))}
      </div>
    );
  }
}
