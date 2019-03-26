/**
 * @class PageEditorWidgets
 */

import * as React from "react";
import { PageEditorWidgetLayout } from "./PageEditorWidgetLayout";
import { PageEditorWidgetControl } from "./PageEditorWidgetControl";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../contexts/WidgetFormContext";
import WidgetContext, { WidgetProviderState } from "../contexts/WidgetContext";

// import styles from "./styles.css";

export type PageEditorWidgetProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidget extends React.Component<PageEditorWidgetProps> {
  render() {
    const { widget, onChange } = this.props;

    if (!widget) {
      return <div>no widget selected</div>;
    }
    return (
      <WidgetContext.Consumer>
        {({ deleteWidget, widgetTypes }: WidgetProviderState) => {
          const widgetControl = widgetTypes[widget.type];
          if (!widgetControl || !widgetControl.editor) {
            return <div>no editor found for widget: {widget.type}</div>;
          }
          const WidgetEditor = widgetControl.editor;
          return (
            <WidgetFormContext.Consumer>
              {({ openForm }: WidgetFormProviderState) => (
                <div
                  id={`page_editor_widget_${widget._id}`}
                  className={`page_editor_widget`}
                >
                  <PageEditorWidgetLayout widget={widget} onChange={onChange}>
                    <PageEditorWidgetControl
                      widget={widget}
                      onChange={onChange}
                    />
                    <WidgetEditor
                      widget={widget}
                      onChange={onChange}
                      deleteSelf={() => deleteWidget(widget._id)}
                      openForm={() => openForm(widget._id, onChange)}
                    />
                  </PageEditorWidgetLayout>
                </div>
              )}
            </WidgetFormContext.Consumer>
          );
        }}
      </WidgetContext.Consumer>
    );
  }
}
