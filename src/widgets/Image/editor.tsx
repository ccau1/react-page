/**
 * @class ImageEditor
 */

import * as React from "react";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../../contexts/WidgetFormContext";

// import styles from "./styles.css";

export type ImageEditorProps = {
  widget: Widget;
  onChange: { (newWidget: Widget): void };
};

export default class ImageEditor extends React.Component<ImageEditorProps> {
  render() {
    const { widget, onChange } = this.props;
    const {
      _id,
      data: { src, width, height }
    } = widget;
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <div
            className="widget_image_editor"
            onClick={ev => {
              ev.stopPropagation();
              openForm(_id, onChange);
            }}
          >
            <img
              src={src}
              style={{
                width: width || "100%",
                height: height || "100%"
              }}
              className={`widget_image_editor_image`}
            />
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
