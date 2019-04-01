/**
 * @class TabMenuEditor
 */

import * as React from "react";
import TabMenuDisplay from "./display";
import { ITabMenuWidget } from ".";

// import styles from "./styles.css";

export type TabMenuEditorProps = {
  widget: ITabMenuWidget;
  openForm: { (widgetId: string): void };
  onChange: { (newWidget: ITabMenuWidget): void };
};

export default class TabMenuEditor extends React.Component<TabMenuEditorProps> {
  render() {
    const { widget, openForm } = this.props;
    // const {
    //   _id,
    //   data: { text, textAlign, heading }
    // } = widget;
    return (
      <div
        onClick={ev => {
          ev.stopPropagation();
          openForm(widget._id);
        }}
      >
        <TabMenuDisplay widget={widget} />
      </div>
    );
  }
}
