/**
 * @class LayoutBuilderForm
 */

import * as React from "react";

export type LayoutBuilderFormProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export type ColumnRatio = "even" | "golden" | "halves" | "thirds";
export type ColumnDirection = "leftToRight" | "rightToLeft";

export default class LayoutBuilderForm extends React.Component<
  LayoutBuilderFormProps
> {
  getColumnWidthsByRatio = (
    columns: number,
    columnRatio: ColumnRatio,
    direction: ColumnDirection
  ): { [column: string]: number } => {
    // get all fixed widths
    let remaining = 100;
    let columnsArr = Array.from(Array(columns).keys());
    console.log("inside getColumnWidthsByRatio", columnRatio, direction);

    switch (columnRatio) {
      case "even":
        if (direction === "rightToLeft") {
          columnsArr = columnsArr.reverse();
        }
        console.log("columnsArr", columnsArr);

        return columnsArr.reduce((obj, columnKey) => {
          obj[columnKey] = (100 / columns).toFixed(2);
          return obj;
        }, {});
      case "golden":
        remaining = 100;
        // 100 = (x*1.618^3 + x*1.618^2 + x*1.618 + x)
        if (direction === "rightToLeft") {
          columnsArr = columnsArr.reverse();
        }

        return columnsArr.reduce((obj, columnKey, index) => {
          if (index === columns - 1) {
            // last one, take up rest
            obj[columnKey] = Math.round(remaining * 100) / 100;
          } else {
            // not last one, take percentage of remaining
            obj[columnKey] = Math.round(remaining * 0.618 * 100) / 100;
            remaining -= obj[columnKey];
          }
          return obj;
        }, {});
      case "halves":
        remaining = 100;
        if (direction === "rightToLeft") {
          columnsArr = columnsArr.reverse();
        }
        return columnsArr.reduce((obj, columnKey, index) => {
          if (index === columns - 1) {
            // last one, take up rest
            obj[columnKey] = Math.round(remaining * 100) / 100;
          } else {
            // not last one, take percentage of remaining
            obj[columnKey] = Math.round(remaining * 0.5 * 100) / 100;
            remaining -= obj[columnKey];
          }
          return obj;
        }, {});
      case "thirds":
        remaining = 100;
        if (direction === "rightToLeft") {
          columnsArr = columnsArr.reverse();
        }
        return columnsArr.reduce((obj, columnKey, index) => {
          if (index === columns - 1) {
            // last one, take up rest
            obj[columnKey] = Math.round(remaining * 100) / 100;
          } else {
            // not last one, take percentage of remaining
            obj[columnKey] = Math.round(remaining * 0.66 * 100) / 100;
            remaining -= obj[columnKey];
          }
          return obj;
        }, {});
      default:
        return {};
    }
  };

  render() {
    const { widget, onChange } = this.props;
    const {
      data: { columns, columnRatio, columnWidths, direction }
    } = widget;
    console.log("form columnRatio", columnRatio);

    return (
      <div className={"widget_layout_builder_form"}>
        <div>
          columns:{" "}
          <input
            type="text"
            style={{ width: "50px" }}
            value={columns}
            onChange={ev => {
              const value = ev.target.value;
              const parsedValue = parseInt(ev.target.value);
              if (value === "" || !isNaN(parsedValue)) {
                onChange({
                  ...widget,
                  data: {
                    ...widget.data,
                    widgets:
                      value === ""
                        ? widget.data.widgets
                        : Array.from(Array(parsedValue).keys()).reduce(
                            (obj, key) => {
                              obj[key] = obj[key] || [];
                              return obj;
                            },
                            widget.data.widgets
                          ),
                    columns: value.replace(/[^0-9]+/, ""),
                    columnWidths:
                      value !== ""
                        ? this.getColumnWidthsByRatio(
                            parsedValue,
                            columnRatio,
                            direction
                          )
                        : {}
                  }
                });
              }
            }}
          />{" "}
          direction:{" "}
          <select
            value={direction}
            onChange={ev =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  direction: ev.target.value,
                  columnWidths: this.getColumnWidthsByRatio(
                    parseInt(columns),
                    columnRatio,
                    ev.target.value as ColumnDirection
                  )
                }
              })
            }
          >
            <option value="leftToRight">Left to Right</option>
            <option value="rightToLeft">Right to Left</option>
          </select>{" "}
          ratio:{" "}
          <select
            value={columnRatio}
            onChange={ev =>
              onChange({
                ...widget,
                data: {
                  ...widget.data,
                  columnRatio: ev.target.value,
                  columnWidths: this.getColumnWidthsByRatio(
                    parseInt(columns),
                    ev.target.value as ColumnRatio,
                    direction
                  )
                }
              })
            }
          >
            <option value="even">Even</option>
            {/* <option value="golden">Golden (0.618)</option> */}
            <option value="halves">Halves (0.5)</option>
            <option value="thirds">Thirds (0.3)</option>
          </select>
        </div>
        <div className={`widget_layout_builder_form_preview_container`}>
          {Object.keys(columnWidths).map(columnWidthKey => (
            <div
              key={columnWidthKey}
              className={`widget_layout_builder_form_preview_block`}
              style={{ width: `${columnWidths[columnWidthKey]}%` }}
            >
              <p className={`widget_layout_builder_form_preview_block_percent`}>
                {columnWidths[columnWidthKey]}%
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
