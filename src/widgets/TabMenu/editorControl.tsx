/**
 * @class TabMenuEditorControl
 */

import * as React from "react";
import { ITabMenuWidget, TabMenuDataHorizontalPosition } from ".";

// import styles from "./styles.css";

export type TabMenuEditorControlProps = {
  widget: ITabMenuWidget;
  onChange: { (newWidget: ITabMenuWidget): void };
};

export default class TabMenuEditorControl extends React.Component<
  TabMenuEditorControlProps
> {
  render() {
    const { widget, onChange } = this.props;
    const {
      data: { horizontal, horizontalPosition }
    } = widget;

    return (
      <div>
        <div className={`form_field horizontal`}>
          <label>Horizontal</label>
          <input
            type="checkbox"
            checked={horizontal}
            onClick={ev => ev.stopPropagation()}
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
              onClick={ev => ev.stopPropagation()}
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
      </div>
    );
  }
}
