/**
 * @class GradientBoxForm
 */

import * as React from "react";
import ColorSwatchButton from "../../components/ColorSwatchButton";

export type GradientBoxFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class GradientBoxForm extends React.Component<
  GradientBoxFormProps
> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: {
        title,
        titleColor,
        items,
        itemColor,
        backgroundImg,
        backgroundColor
      }
    } = widget;

    // define default item
    const _items = items ? [...items] : [""];
    // if the last item is not empty string, add an empty one
    if (_items[_items.length - 1] !== "") {
      _items.push("");
    }

    return (
      <div className={"widget_form widget_gradient_box_form"}>
        <div className={`form_field horizontal`}>
          <label>Background Image </label>
          <input
            type="text"
            value={backgroundImg}
            onChange={ev =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  backgroundImg: ev.target.value
                }
              })
            }
          />
        </div>
        <div className={`form_field horizontal`}>
          <label>Background Color</label>
          <ColorSwatchButton
            color={backgroundColor}
            onChange={color =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  backgroundColor: color
                }
              })
            }
          />
        </div>
        <div className={`form_field horizontal`}>
          <label>Title </label>
          <input
            type="text"
            value={title}
            onChange={ev =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  title: ev.target.value
                }
              })
            }
          />
        </div>
        <div className={`form_field horizontal`}>
          <label>Subtitle Color</label>
          <ColorSwatchButton
            color={titleColor}
            onChange={color =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  titleColor: color
                }
              })
            }
          />
        </div>
        <div className={`form_field horizontal`}>
          <label>Items </label>
          <div className={`items_container`}>
            {_items.map((item: string, index: number) => (
              <div key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={ev =>
                    onChange({
                      ...widget,
                      data: {
                        ...widget.data,
                        items: (index === items.length
                          ? [...items, ""]
                          : items
                        ).map((item: string, iIndex: number) =>
                          iIndex === index ? ev.target.value : item
                        )
                      }
                    })
                  }
                />
                {_items.length - 1 !== index && (
                  <a
                    onClick={() => {
                      const newItems = [...items];
                      newItems.splice(index, 1);
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
        <div className={`form_field horizontal`}>
          <label>Item Color</label>
          <ColorSwatchButton
            color={itemColor}
            onChange={color =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  itemColor: color
                }
              })
            }
          />
        </div>
      </div>
    );
  }
}
