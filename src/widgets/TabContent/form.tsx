/**
 * @class TabContentForm
 */

import * as React from "react";
import { ITabContentWidget, TabContentDataContent } from ".";

// import styles from "./styles.css";

export type TabContentFormProps = {
  widget: ITabContentWidget;
  onChange: { (newWidget: ITabContentWidget): void };
};

export default class TabContentForm extends React.Component<
  TabContentFormProps
> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { tabId, contents }
    } = widget;

    // define default item
    const _items =
      contents && contents.length ? [...contents] : [{ id: "", widgets: [] }];

    // if the last item is not empty string, add an empty one
    if (
      _items[_items.length - 1].id !== "" ||
      _items[_items.length - 1].widgets.length
    ) {
      _items.push({ id: "", widgets: [] });
    }

    return (
      <div className={"widget_form widget_tab_content_form"}>
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
          <label>Tab Items</label>
          <div>
            {_items.map((item: TabContentDataContent, itemIndex: number) => (
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
                          contents: (itemIndex === contents.length
                            ? [...contents, { id: "", widgets: [] }]
                            : contents
                          ).map((o: TabContentDataContent, oIndex: number) =>
                            oIndex === itemIndex
                              ? { ...o, id: ev.target.value }
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
                      const newItems = [...contents];
                      newItems.splice(itemIndex, 1);
                      onChange({
                        ...widget,
                        data: { ...widget.data, contents: newItems }
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
