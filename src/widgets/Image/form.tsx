/**
 * @class ImageForm
 */

import * as React from "react";

// import styles from "./styles.css";

export type ImageFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class ImageForm extends React.Component<ImageFormProps> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { src, height, width }
    } = widget;

    return (
      <div className={"widget_text_form"}>
        <label>URI </label>
        <input
          type="text"
          value={src}
          onChange={ev =>
            onChange({
              ...widget,
              data: {
                ...widget.data,
                src: ev.target.value
              }
            })
          }
        />
        <br />

        <label>Height </label>
        <input
          type="text"
          value={width}
          onChange={ev =>
            onChange({
              ...widget,
              data: {
                ...widget.data,
                width: ev.target.value
              }
            })
          }
        />
        <br />
        <label>Width </label>
        <input
          type="text"
          value={height}
          onChange={ev =>
            onChange({
              ...widget,
              data: {
                ...widget.data,
                height: ev.target.value
              }
            })
          }
        />
        <br />
      </div>
    );
  }
}
