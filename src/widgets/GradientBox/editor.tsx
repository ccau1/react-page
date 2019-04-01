/**
 * @class TextEditor
 */

import * as React from "react";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../../contexts/WidgetFormContext";
import GradientBoxDisplay from "./display";

// import styles from "./styles.css";

export type TextEditorProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class TextEditor extends React.Component<TextEditorProps> {
  render() {
    const { widget } = this.props;
    const { _id } = widget;
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <div
            onClick={ev => {
              ev.stopPropagation();
              openForm(_id);
            }}
          >
            <GradientBoxDisplay widget={widget} />
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
