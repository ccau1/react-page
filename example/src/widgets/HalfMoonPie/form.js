/**
 * @class HalfMoonPieForm
 */

import * as React from "react";
import HalfMoonPieareaAutosize from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";

export default class HalfMoonPieForm extends React.Component {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { title, subtitle, img }
    } = widget;

    return (
      <div className={"widget_half_moon_pie_form"}>
        <label>Title </label>
        <input
          type="text"
          value={title}
          onChange={ev =>
            onChange({
              ...widget,
              data: { ...widget.data, title: ev.target.value }
            })
          }
        />
        <br />
        <label>Subtitle </label>
        <br />
        <TextareaAutosize
          value={subtitle}
          onChange={ev =>
            onChange({
              ...widget,
              data: { ...widget.data, subtitle: ev.target.value }
            })
          }
        />
        <br />
        <label>Image URI </label>
        <input
          type="text"
          value={img}
          onChange={ev =>
            onChange({
              ...widget,
              data: { ...widget.data, img: ev.target.value }
            })
          }
        />
        <br />
      </div>
    );
  }
}
