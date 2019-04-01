/**
 * @class HalfMoonPieEditor
 */

import * as React from "react";
import HalfMoonPieDisplay from "./display";
export default class HalfMoonPieEditor extends React.Component {
  render() {
    const { widget, openForm } = this.props;
    const { _id } = widget;
    return (
      <div
        onClick={ev => {
          ev.stopPropagation();
          openForm(_id);
        }}
      >
        <HalfMoonPieDisplay widget={widget} />
      </div>
    );
  }
}
