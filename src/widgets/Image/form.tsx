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
      data: { src }
    } = widget;
    console.log("Image FORM", src);

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
      </div>
    );
  }
}
