/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module "*.svg" {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

declare module "utils" {
  const getWidget: { (widgets: Widget[], widgetId: string): Widget | null };
  export { getWidget };
}

declare type WidgetIndex = {
  key: string;
  name: string;
  editor: any;
  editorControl: any;
  display: any;
  form: any;
  overview?: any;
  // editor: ReactType;
  // display: ReactType;
  // overview?: ReactType;
  new: { (obj?: Widget): Widget };
  cloneWidget?: {
    (widget: Widget, widgetTypes: { [key: string]: WidgetIndex }): Widget;
  };
  getWidget?: { (widget: Widget, widgetId: string): Widget | null };
  transformSubWidgets?: {
    (
      widget: Widget,
      transformFn: {
        (widget: Widget, stopSearch?: { (): void }): Widget | null;
      },
      widgetTypes: { [type: string]: WidgetIndex },
      transformArrayFn?: {
        (widgets: Widget[], stopSearch: { (): void }): Widget[];
      }
    ): Widget;
  };
};

declare type Layout = {
  boxed?: boolean;
  marginUnit?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingUnit?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  backgroundType?: string;
  backgroundColor?: string;
  backgroundUri?: string;
  backgroundSize?: string;
};

declare type Widget = {
  _id: string;
  position: string;
  layout: Layout;
  inlineStyle: string;
  userPermission: {
    delete: boolean;
    edit: boolean;
    move: boolean;
  };
  hidden: boolean;
  mobileHidden: boolean;
  anchor: {
    hash: string;
    top: number;
  };
  type: string;
  data: any;
};

declare type Page = {
  _id: string;
  isTemplate: boolean;
  workspace: string;
  path: string;
  subPath: string;
  fromPageContent: string;
  layout: Layout;
  widgets: Widget[];
};
