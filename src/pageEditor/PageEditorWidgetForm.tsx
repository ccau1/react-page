/**
 * @class PageEditorWidgetForms
 */

import * as React from "react";
import { widgets } from "../widgets";
import { PageEditorWidgetLayoutForm } from "./PageEditorWidgetLayoutForm";

// import styles from "./styles.css";

export type PageEditorWidgetFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidgetForm extends React.Component<
  PageEditorWidgetFormProps
> {
  render() {
    const { widget, onChange } = this.props;
    console.log("PageEditorWidgetForm", widget, onChange);
    if (!widget) {
      return <div>no widget selected</div>;
    }
    const widgetControl = widgets[widget.type];
    // const WidgetForm = widgetControl.form;
    return (
      <div className={`page_editor_widget_form`}>
        <div className={`page_editor_widget_form_header`}>
          <h1>{widgetControl && widgetControl.name}</h1>
        </div>
        <div className={`page_editor_widget_form_content`}>
          <div className={`page_editor_widget_form_left`}>
            {widgetControl && widgetControl.form && (
              <widgetControl.form
                widget={widget}
                onChange={(newWidget: Widget) => {
                  console.log("got", newWidget, onChange);

                  onChange(newWidget);
                }}
              />
            )}
          </div>
          <div className={`page_editor_widget_form_right`}>
            <PageEditorWidgetLayoutForm widget={widget} onChange={onChange} />
          </div>
        </div>
      </div>
    );
  }
}
