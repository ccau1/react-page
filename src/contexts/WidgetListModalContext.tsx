/**
 * @class Page
 */

import * as React from "react";
import * as RModal from "react-modal";
const Modal_: any = RModal;
const Modal = Modal_.default;

import { PageEditorWidgetsList } from "../pageEditor/PageEditorWidgetsList";

const WidgetListModalContext = React.createContext({});

export type WidgetListModalProviderProps = {
  children: any;
};

export type WidgetListModalProviderState = {
  isOpen: boolean;
  onSelect: { (widgetType: WidgetIndex): void } | null;
  openList: { (onSelect: { (widgetType: WidgetIndex): void }): void };
  closeList: { (): void };
};

class WidgetListModalProvider extends React.PureComponent<
  WidgetListModalProviderProps
> {
  state: WidgetListModalProviderState = {
    isOpen: false,
    onSelect: null,
    openList: (onSelect: { (widgetType: WidgetIndex): void }): void => {
      this.setState({ isOpen: true, onSelect });
    },
    closeList: (): void => {
      this.setState({ isOpen: false, onSelect: null });
    }
  };

  render() {
    return (
      <WidgetListModalContext.Provider value={this.state}>
        <React.Fragment>
          {this.props.children}
          <Modal
            isOpen={this.state.isOpen}
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
            onRequestClose={() => this.setState({ isOpen: false })}
          >
            <PageEditorWidgetsList
              onSelect={widgetType =>
                this.state.onSelect && this.state.onSelect(widgetType)
              }
            />
          </Modal>
        </React.Fragment>
      </WidgetListModalContext.Provider>
    );
  }
}

export default {
  ...WidgetListModalContext,
  Provider: WidgetListModalProvider,
  inject: (Comp: React.FunctionComponent<any>) => (props: any) => (
    <WidgetListModalContext.Consumer>
      {(value: WidgetListModalProviderState) => (
        <Comp {...props} context={value} />
      )}
    </WidgetListModalContext.Consumer>
  )
};
