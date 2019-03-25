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
  height = 0;

  autoGrow = (element: any) => {
    console.log("ele", element);
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  };
  render() {
    const { widget, onChange } = this.props;
    const {
      _id,
      data: { src, fit, position }
    } = widget;
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <div
            className="widget_image_editor"
            style={{
              backgroundImage: `url("${src}")`,
              backgroundSize: fit,
              backgroundPosition: position
            }}
            onClick={() => openForm(_id, onChange)}
          >
            <img src={src} className={`widget_image_editor_image`} />
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
