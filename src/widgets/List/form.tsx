/**
 * @class ListForm
 */

import * as React from "react";
import { IListWidget, ListDataItem, ListDataType } from ".";

// import styles from "./styles.css";

export type ListFormProps = {
  widget: IListWidget;
  onChange: { (newWidget: IListWidget): void };
};

export default class ListForm extends React.Component<ListFormProps> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { type, items }
    } = widget;

    // define default item
    const _items = items && items.length ? [...items] : [{ text: "" }];

    // if the last item is not empty string, add an empty one
    if (_items[_items.length - 1].text !== "") {
      _items.push({ text: "" });
    }

    return (
      <div className={"widget_form widget_list_form"}>
        <div className={`form_field horizontal`}>
          <label>List Type</label>
          <select
            value={type}
            onChange={ev =>
              onChange({
                ...widget,
                data: { ...widget.data, type: ev.target.value as ListDataType }
              })
            }
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="numeric">Numeric</option>
            <option value="upper-roman">Roman</option>
            <option value="lower-roman">Lower Roman</option>
            <option value="upper-alpha">Alpha</option>
            <option value="lower-alpha">Lower Alpha</option>
          </select>
        </div>
        <div className={`form_field horizontal`}>
          <label>List Items</label>
          <div>
            {_items.map((item: ListDataItem, itemIndex: number) => (
              <div key={itemIndex}>
                <div className={`form_field horizontal`}>
                  <label>Text</label>
                  <input
                    type="text"
                    value={item.text}
                    onChange={ev => {
                      onChange({
                        ...widget,
                        data: {
                          ...widget.data,
                          items: (itemIndex === items.length
                            ? [...items, { text: "" }]
                            : items
                          ).map((o: ListDataItem, oIndex: number) =>
                            oIndex === itemIndex
                              ? { ...o, text: ev.target.value }
                              : o
                          )
                        }
                      });
                    }}
                  />
                </div>
                {_items.length - 1 !== itemIndex && (
                  <a
                    onClick={() => {
                      const newItems = [...items];
                      newItems.splice(itemIndex, 1);
                      onChange({
                        ...widget,
                        data: { ...widget.data, items: newItems }
                      });
                    }}
                    style={{ color: "#f00" }}
                  >
                    Remove
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
