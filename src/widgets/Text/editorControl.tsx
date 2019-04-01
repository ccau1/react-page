/**
 * @class TextEditorControl
 */

import * as React from "react";
import { ITextWidget, TextDataHeading } from ".";

// import styles from "./styles.css";

export type TextEditorControlProps = {
  widget: ITextWidget;
  onChange: { (newWidget: ITextWidget): void };
};

export default class TextEditorControl extends React.Component<
  TextEditorControlProps
> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { heading, textAlign }
    } = widget;

    return (
      <div>
        <select
          value={heading}
          onClick={ev => ev.stopPropagation()}
          onChange={ev => {
            ev.stopPropagation();
            onChange({
              ...widget,
              data: {
                ...widget.data,
                heading: ev.target.value as TextDataHeading
              }
            });
          }}
        >
          <option value="h1">Header 1</option>
          <option value="h2">Header 2</option>
          <option value="h3">Header 3</option>
          <option value="h4">Header 4</option>
          <option value="p">Paragraph</option>
          <option value="small">Small</option>
        </select>{" "}
        <button
          className={`${textAlign === "left" ? "selected" : ""}`}
          onClick={ev => {
            ev.stopPropagation();
            onChange({
              ...widget,
              data: { ...widget.data, textAlign: "left" }
            });
          }}
        >
          Left
        </button>
        <button
          className={`${textAlign === "center" ? "selected" : ""}`}
          onClick={ev => {
            ev.stopPropagation();
            onChange({
              ...widget,
              data: { ...widget.data, textAlign: "center" }
            });
          }}
        >
          Center
        </button>
        <button
          className={`${textAlign === "right" ? "selected" : ""}`}
          onClick={ev => {
            ev.stopPropagation();
            onChange({
              ...widget,
              data: { ...widget.data, textAlign: "right" }
            });
          }}
        >
          Right
        </button>
      </div>
    );
  }
}
