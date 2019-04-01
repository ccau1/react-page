/**
 * @class ListEditor
 */

import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ListDataItem } from ".";

// import styles from "./styles.css";

export type ListEditorProps = {
  widget: Widget;
  openForm: { (widgetId: string): void };
  onChange: { (newWidget: Widget): void };
};

export default class ListEditor extends React.Component<ListEditorProps> {
  render() {
    const { widget, openForm, onChange } = this.props;
    const {
      _id,
      data: { type, items }
    } = widget;

    const ListComponent = type === "circle" || type === "square" ? "ul" : "ol";
    return (
      <div className={`widget_list`}>
        <ListComponent className={`list-style-${type}`}>
          {items.map((item: ListDataItem, itemIndex: number) => (
            <li key={itemIndex}>
              <TextareaAutosize
                className={`widget_text_editor widget_text`}
                value={item.text}
                onClick={ev => ev.stopPropagation()}
                onDoubleClick={ev => {
                  ev.stopPropagation();
                  openForm(_id);
                }}
                onChange={(ev: any) =>
                  onChange({
                    ...widget,
                    data: {
                      ...widget.data,
                      items: items.map((o: ListDataItem, oIndex: number) =>
                        oIndex === itemIndex
                          ? { ...o, text: ev.target.value }
                          : o
                      )
                    }
                  })
                }
              />
            </li>
          ))}
        </ListComponent>
      </div>
    );
  }
}
