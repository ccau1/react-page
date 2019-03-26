/**
 * @class HalfMoonPieEditor
 */

import * as React from "react";
import HalfMoonPieDisplay from "./display";
import { WidgetFormContext } from "react-page";
export default class HalfMoonPieEditor extends React.Component {
  render() {
    const { widget, onChange, openForm } = this.props;
    const {
      _id,
      data: { title, subtitle, img }
    } = widget;
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }) => (
          <div onClick={() => openForm(_id)}>
            <HalfMoonPieDisplay widget={widget} />
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
