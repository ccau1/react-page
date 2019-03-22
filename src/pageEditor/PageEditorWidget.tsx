/**
 * @class PageEditorWidgets
 */

import * as React from "react";
import { widgets } from "../widgets";
import { PageEditorWidgetLayout } from "./PageEditorWidgetLayout";
import { PageEditorWidgetControl } from "./PageEditorWidgetControl";

// import styles from "./styles.css";

export type PageEditorWidgetProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidget extends React.Component<PageEditorWidgetProps> {
  render() {
    const { widget, onChange } = this.props;
    console.log("PageEditorWidget", widget);
    if (!widget) {
      return <div>no widget selected</div>;
    }
    const widgetControl = widgets[widget.type];
    if (!widgetControl || !widgetControl.editor) {
      return <div>no editor found for widget: {widget.type}</div>;
    }
    const WidgetEditor = widgetControl.editor;
    return (
      <div className={`page_editor_widget`}>
        <PageEditorWidgetLayout widget={widget} onChange={onChange}>
          <PageEditorWidgetControl widget={widget} onChange={onChange} />
          <WidgetEditor widget={widget} onChange={onChange} />
        </PageEditorWidgetLayout>
      </div>
    );
  }
}
