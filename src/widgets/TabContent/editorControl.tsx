/**
 * @class TabContentEditorControl
 */

import * as React from "react";
import { ITabContentWidget } from ".";

export type TabContentEditorControlProps = {
  widget: ITabContentWidget;
  onChange: { (newWidget: ITabContentWidget): void };
};

export default class TabContentEditorControl extends React.Component<
  TabContentEditorControlProps
> {
  render() {
    // const { widget, onChange } = this.props;
    // const {
    //   data: { heading, textAlign }
    // } = widget;

    return <div />;
  }
}
