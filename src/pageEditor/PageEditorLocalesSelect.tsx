/**
 * @class PageEditorLocalesSelects
 */

import * as React from "react";
import LocaleContext, { LocaleProviderState } from "../contexts/LocaleContext";
import { getLanguage } from "../languages";

export type PageEditorLocalesSelectProps = {};

export type PageEditorLocalesSelectState = {};

export class PageEditorLocalesSelect extends React.Component<
  PageEditorLocalesSelectProps,
  PageEditorLocalesSelectState
> {
  render() {
    console.log("get get", getLanguage("en"));

    return (
      <LocaleContext.Consumer>
        {({ availableLocales, locale, setLocale }: LocaleProviderState) => (
          <div className={`page_editor_locale_select`}>
            {availableLocales.map(availableLocale => {
              const langObj = getLanguage(availableLocale);
              return (
                <a
                  key={availableLocale}
                  className={`page_editor_locale_select_item ${
                    locale === availableLocale ? "active" : "inactive"
                  }`}
                  onClick={() => setLocale(availableLocale)}
                >
                  {langObj ? langObj.nativeName : availableLocale}
                </a>
              );
            })}
          </div>
        )}
      </LocaleContext.Consumer>
    );
  }
}
