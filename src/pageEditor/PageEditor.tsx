/**
 * @class PageEditor
 */

import * as React from "react";
import { PageEditorLayout } from "./PageEditorLayout";
import { PageEditorWidgets } from "./PageEditorWidgets";
import { PageEditorWidgetsOverviewDroppable } from "./PageEditorWidgetsOverview";
import HoverContext from "../contexts/HoverContext";
import WidgetFormContext from "../contexts/WidgetFormContext";
import { PageEditorAddWidgetButton } from "./PageEditorAddWidgetButton";
import WidgetContext from "../contexts/WidgetContext";
import withDragDropContext from "../contexts/withDragDropContext";
import WidgetListModalContext from "../contexts/WidgetListModalContext";
import { PageEditorPageData } from "./PageEditorPageData";
import LocaleContext from "../contexts/LocaleContext";
import { PageEditorLocalesSelect } from "./PageEditorLocalesSelect";

export type PageEditorProps = {
  page: Page;
  onChange: { (newPage: Page): void };
  widgetTypes: { [key: string]: WidgetIndex };
  locale?: string;
  onLocaleChange?: (locale: string) => void;
  availableLocales?: string[];
};

export const PageEditor = withDragDropContext(
  class PageEditor extends React.Component<PageEditorProps> {
    render() {
      const {
        page,
        onChange,
        widgetTypes,
        locale,
        onLocaleChange,
        availableLocales
      } = this.props;

      return (
        <LocaleContext.Provider
          locale={locale}
          setLocale={onLocaleChange}
          availableLocales={availableLocales}
        >
          <WidgetContext.Provider
            widgetTypes={widgetTypes}
            widgets={page.widgets}
            onWidgetsChange={newWidgets =>
              onChange({ ...page, widgets: newWidgets })
            }
          >
            <WidgetListModalContext.Provider>
              <WidgetFormContext.Provider page={page}>
                <HoverContext.Provider>
                  <div className={`page_base page_editor`}>
                    <div className={"page_editor_left_panel"}>
                      <PageEditorAddWidgetButton
                        onCreate={newWidget =>
                          onChange({
                            ...page,
                            widgets: [...page.widgets, newWidget]
                          })
                        }
                      />
                      <div className={`page_editor_left_panel_locale`}>
                        <label>lang: </label>
                        <div style={{ flex: 1 }}>
                          <PageEditorLocalesSelect />
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <PageEditorWidgetsOverviewDroppable
                          widgets={page.widgets}
                          onChange={(newWidgets: Widget[]) => {
                            onChange({ ...page, widgets: newWidgets });
                          }}
                        />
                      </div>
                      <PageEditorPageData page={page} />
                    </div>
                    <PageEditorLayout page={page}>
                      <PageEditorWidgets
                        widgets={page.widgets}
                        onChange={newWidgets =>
                          onChange({ ...page, widgets: newWidgets })
                        }
                      />
                    </PageEditorLayout>
                  </div>
                </HoverContext.Provider>
              </WidgetFormContext.Provider>
            </WidgetListModalContext.Provider>
          </WidgetContext.Provider>
        </LocaleContext.Provider>
      );
    }
  }
);
