/**
 * @class Page
 */

import * as React from "react";

const LocaleContext = React.createContext({});

export type LocaleProviderProps = {
  locale?: string;
  availableLocales?: string[];
  setLocale?: (locale: string) => void;
  children?: JSX.Element;
};

export type LocaleProviderState = {
  locale: string;
  availableLocales: string[];
  setLocale: (locale: string) => void;
};

class LocaleProvider extends React.PureComponent<
  LocaleProviderProps,
  LocaleProviderState
> {
  // whenever we set/get locale, this is the fallback locale
  public static defaultLocale = "en";
  public static defaultAvailableLocales = ["en"];

  state: LocaleProviderState = {
    locale: LocaleProvider.defaultLocale,
    availableLocales: LocaleProvider.defaultAvailableLocales,
    setLocale: (locale: string) => {
      this.setState({ locale });
      if (this.props.setLocale) {
        this.props.setLocale(locale);
      }
    }
  };

  constructor(props: LocaleProviderProps) {
    super(props);
    this.state.locale = props.locale || LocaleProvider.defaultLocale;
    this.state.availableLocales =
      props.availableLocales || LocaleProvider.defaultAvailableLocales;
  }

  componentDidUpdate(prevProps: LocaleProviderProps) {
    if (this.props.locale !== prevProps.locale) {
      this.setState({
        locale: this.props.locale || LocaleProvider.defaultLocale
      });
    }
    if (this.props.availableLocales !== prevProps.availableLocales) {
      this.setState({
        availableLocales:
          this.props.availableLocales || LocaleProvider.defaultAvailableLocales
      });
    }
  }

  render() {
    return (
      <LocaleContext.Provider value={this.state}>
        <React.Fragment>{this.props.children}</React.Fragment>
      </LocaleContext.Provider>
    );
  }
}

export default {
  ...LocaleContext,
  Provider: LocaleProvider,
  inject: (Comp: React.FunctionComponent<any>) => (props: any) => (
    <LocaleContext.Consumer>
      {(value: LocaleProviderState) => <Comp {...props} context={value} />}
    </LocaleContext.Consumer>
  )
};
