/**
 * @class PageEditorAddWidgetButtons
 */

import * as React from "react";
import * as RModal from "react-modal";
import { PageEditorWidgetsList } from "./PageEditorWidgetsList";
import WidgetFormContext, {
  WidgetFormProviderState
} from "../contexts/WidgetFormContext";
const Modal_: any = RModal;
const Modal = Modal_.default;

export type PageEditorAddWidgetButtonProps = {
  onCreate: { (newWidget: Widget): void };
};

export type PageEditorAddWidgetButtonState = {
  isListModalOpen: boolean;
};

export class PageEditorAddWidgetButton extends React.Component<
  PageEditorAddWidgetButtonProps
> {
  state: PageEditorAddWidgetButtonState = {
    isListModalOpen: false
  };

  openListModal = () => {
    this.setState({ isListModalOpen: true });
  };

  closeListModal = () => {
    this.setState({ isListModalOpen: false });
  };
  render() {
    // const { onCreate } = this.props;

    // const widgetControl = widgets[widget.type];
    // if (!widgetControl || !widgetControl.editor) {
    //   return <div>no editor found for widget: {widget.type}</div>;
    // }
    // const WidgetEditor = widgetControl.editor;
    return (
      <WidgetFormContext.Consumer>
        {({ openForm }: WidgetFormProviderState) => (
          <div className={`page_editor_add_widget_button_container`}>
            <button
              className={`page_editor_add_widget_button_container`}
              onClick={this.openListModal}
            >
              Add Widget
            </button>
            <Modal
              isOpen={this.state.isListModalOpen}
              appElement={document.getElementById("root")}
              className={{
                base: "widget-form-modal-container",
                afterOpen: "after-open",
                beforeClose: "before-close"
              }}
              overlayClassName={"widget-form-modal-overlay"}
              contentLabel="Widget Form"
              shouldCloseOnEsc={true}
              shouldCloseOnOverlayClick={true}
              onRequestClose={this.closeListModal}
            >
              <PageEditorWidgetsList
                onSelect={widgetType => {
                  console.log("widgetType", widgetType);
                  const newWidget = widgetType.new();
                  this.props.onCreate(newWidget);
                  this.closeListModal();
                  openForm(newWidget._id);
                }}
              />
            </Modal>
          </div>
        )}
      </WidgetFormContext.Consumer>
    );
  }
}
