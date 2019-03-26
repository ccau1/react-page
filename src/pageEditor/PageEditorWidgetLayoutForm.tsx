/**
 * @class PageEditorWidgetLayoutForms
 */

import * as React from "react";
import { PageEditorWidgetLayoutBackgroundForm } from "./PageEditorWidgetLayoutBackgroundForm";
import { PageEditorWidgetLayoutMarginForm } from "./PageEditorWidgetLayoutMarginForm";
import { PageEditorWidgetLayoutPaddingForm } from "./PageEditorWidgetLayoutPaddingForm";
import { PageEditorWidgetLayoutInlineStyleForm } from "./PageEditorWidgetLayoutInlineStyleForm";

export type PageEditorWidgetLayoutFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export class PageEditorWidgetLayoutForm extends React.Component<
  PageEditorWidgetLayoutFormProps
> {
  render() {
    const { widget, onChange } = this.props;
    if (!widget) {
      return <div>no widget selected</div>;
    }

    return (
      <div className={`page_editor_widget_layout_form`}>
        <PageEditorWidgetLayoutMarginForm widget={widget} onChange={onChange} />
        <PageEditorWidgetLayoutPaddingForm
          widget={widget}
          onChange={onChange}
        />
        <PageEditorWidgetLayoutBackgroundForm
          widget={widget}
          onChange={onChange}
        />
        <PageEditorWidgetLayoutInlineStyleForm
          widget={widget}
          onChange={onChange}
        />
      </div>
    );
  }
}
