/**
 * @class TabMenuForm
 */

import * as React from "react";
import {
  TabMenuDataItem,
  ITabMenuWidget,
  TabMenuDataHorizontalPosition
} from ".";

export type TabMenuFormProps = {
  widget: ITabMenuWidget;
  onChange: { (newWidget: Widget): void };
};

export default class TabMenuForm extends React.Component<TabMenuFormProps> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { tabId, items, horizontal, horizontalPosition }
    } = widget;

    // define default item
    const _items = items ? [...items] : [{ id: "", name: "" }];
    // if the last item is not empty string, add an empty one
    if (
      _items[_items.length - 1].id !== "" ||
      _items[_items.length - 1].name !== ""
    ) {
      _items.push({ id: "", name: "" });
    }

    return (
      <div className={"widget_form widget_tab_menu_form"}>
        <div className={`form_field horizontal`}>
          <label>Tab ID</label>
          <input
            type="text"
            value={tabId}
            onChange={ev => {
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  tabId: ev.target.value
                }
              });
            }}
          />
        </div>
        <div className={`form_field horizontal`}>
          <label>Horizontal</label>
          <input
            type="checkbox"
            checked={horizontal}
            onChange={() => {
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  horizontal: !horizontal
                }
              });
            }}
          />
        </div>
        {horizontal && (
          <div className={`form_field horizontal`}>
            <label>Horizontal Positioning</label>
            <select
              value={horizontalPosition}
              onChange={ev =>
                onChange({
                  ...widget,
                  data: {
                    ...widget.data,
                    horizontalPosition: ev.target
                      .value as TabMenuDataHorizontalPosition
                  }
                })
              }
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="space-between">Space Between</option>
              <option value="space-around">Space Around</option>
              <option value="fill">Fill</option>
            </select>
          </div>
        )}
        <div className={`form_field horizontal`}>
          <label>Tab Items</label>
          <div>
            {_items.map((item: TabMenuDataItem, itemIndex: number) => (
              <div key={itemIndex}>
                <div className={`form_field horizontal`}>
                  <label>Tab Item ID</label>
                  <input
                    type="text"
                    value={item.id}
                    onChange={ev => {
                      onChange({
                        ...widget,
                        data: {
                          ...widget.data,
                          items: (itemIndex === items.length
                            ? [...items, { id: "", name: "" }]
                            : items
                          ).map((o: TabMenuDataItem, oIndex: number) =>
                            oIndex === itemIndex
                              ? { ...o, id: ev.target.value }
                              : o
                          )
                        }
                      });
                    }}
                  />
                </div>
                <div className={`form_field horizontal`}>
                  <label>Name</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={ev => {
                      onChange({
                        ...widget,
                        data: {
                          ...widget.data,
                          items: (itemIndex === items.length
                            ? [...items, { id: "", name: "" }]
                            : items
                          ).map((o: TabMenuDataItem, oIndex: number) =>
                            oIndex === itemIndex
                              ? { ...o, name: ev.target.value }
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
