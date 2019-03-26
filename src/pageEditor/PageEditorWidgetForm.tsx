/**
 * @class PageEditorWidgetForms
 */

import * as React from "react";
import { PageEditorWidgetLayoutForm } from "./PageEditorWidgetLayoutForm";
import WidgetContext, { WidgetProviderState } from "../contexts/WidgetContext";

// import styles from "./styles.css";

export type PageEditorWidgetFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
  onDelete: { (widget: Widget): void };
};

export class PageEditorWidgetForm extends React.Component<
  PageEditorWidgetFormProps
> {
  render() {
    const { widget, onChange, onDelete } = this.props;

    if (!widget) {
      return <div>no widget selected</div>;
    }
    return (
      <WidgetContext.Consumer>
        {({ widgetTypes }: WidgetProviderState) => {
          const widgetControl = widgetTypes[widget.type];
          if (!widgetControl || !widgetControl.form) {
            return <p>no widget form found for: {widget.type}</p>;
          }
          return (
            <div className={`page_editor_widget_form`}>
              <div className={`page_editor_widget_form_header`}>
                <h1>{widgetControl && widgetControl.name}</h1>
              </div>
              <div className={`page_editor_widget_form_content`}>
                <div className={`page_editor_widget_form_left`}>
                  {widgetControl && widgetControl.form && (
                    <widgetControl.form widget={widget} onChange={onChange} />
                  )}
                </div>
                <div className={`page_editor_widget_form_right`}>
                  <PageEditorWidgetLayoutForm
                    widget={widget}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className={`page_editor_widget_form_footer`}>
                <div className={`page_editor_widget_form_footer_left`}>
                  <a
                    className={`page_editor_widget_form_delete_button`}
                    onClick={() => onDelete(widget)}
                  >
                    Delete
                  </a>
                </div>
                <div className={`page_editor_widget_form_footer_right`} />
              </div>
            </div>
          );
        }}
      </WidgetContext.Consumer>
    );
  }
}
