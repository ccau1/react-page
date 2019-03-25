/**
 * @class Page
 */

import * as React from "react";
import * as RModal from "react-modal";
const Modal_: any = RModal;
const Modal = Modal_.default;

import { PageEditorWidgetForm } from "../pageEditor/PageEditorWidgetForm";
import { getWidget } from "../widgets/utils";
import WidgetContext, { WidgetProviderState } from "./WidgetContext";

const WidgetFormContext = React.createContext({});

export type WidgetFormProviderProps = {
  page: Page;
  children: any;
};

export type WidgetFormProviderState = {
  isOpen: boolean;
  currentWidgetId: string | null;
  currentOnChange: { (newWidget: Widget): void } | null;
  openForm: {
    (widgetId: string, onChange?: { (newWidget: Widget): void } | null): void;
  };
  closeForm: {
    (): void;
  };
};

class WidgetFormProvider extends React.PureComponent<WidgetFormProviderProps> {
  state: WidgetFormProviderState = {
    isOpen: false,
    currentWidgetId: null,
    currentOnChange: null,
    openForm: (widgetId, onChange = null) => {
      this.setState({
        isOpen: true,
        currentWidgetId: widgetId,
        currentOnChange: onChange
      });
    },
    closeForm: () => {
      this.setState({
        isOpen: false,
        currentWidgetId: null,
        currentOnChange: null
      });
    }
  };

  render() {
    const widget = this.state.currentWidgetId
      ? getWidget(this.props.page.widgets, this.state.currentWidgetId)
      : null;
    return (
      <WidgetContext.Consumer>
        {({ updateWidget, deleteWidget }: WidgetProviderState) => (
          <WidgetFormContext.Provider value={this.state}>
            <React.Fragment>
              {this.props.children}
              <Modal
                isOpen={this.state.isOpen}
                appElement={document.getElementById("root")}
                className={{
                  base: "widget-form-modal-container page_base",
                  afterOpen: "after-open",
                  beforeClose: "before-close"
                }}
                overlayClassName={"widget-form-modal-overlay"}
                contentLabel="Widget Form"
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => this.setState({ isOpen: false })}
              >
                {widget && (
                  <PageEditorWidgetForm
                    widget={widget}
                    onChange={newWidget => {
                      updateWidget(newWidget);
                      if (this.state.currentOnChange) {
                        this.state.currentOnChange(newWidget);
                      }
                    }}
                    onDelete={widget => {
                      this.state.closeForm();
                      deleteWidget(widget._id);
                    }}
                  />
                )}
              </Modal>
            </React.Fragment>
          </WidgetFormContext.Provider>
        )}
      </WidgetContext.Consumer>
    );
  }
}

export default {
  ...WidgetFormContext,
  Provider: WidgetFormProvider,
  inject: (Comp: React.FunctionComponent<any>) => (props: any) => (
    <WidgetFormContext.Consumer>
      {(value: WidgetFormProviderState) => <Comp {...props} context={value} />}
    </WidgetFormContext.Consumer>
  )
};
