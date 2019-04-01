import editor from "./editor";
import form from "./form";
import editorControl from "./editorControl";
import display from "./display";
import context from "./context";
import overview from "./overview";
import { newWidget } from "../utils";

export type TabMenuDataHorizontalPosition =
  | "left"
  | "center"
  | "right"
  | "fill";

export type TabMenuData = {
  tabId: string;
  horizontal: boolean;
  horizontalPosition: TabMenuDataHorizontalPosition;
  items: TabMenuDataItem[];
};
export type TabMenuDataItem = { id: string; name: string };

export interface ITabMenuWidget extends Widget {
  data: TabMenuData;
}

export default {
  key: "tabMenu",
  name: "Tab Menu",
  editor,
  editorControl,
  provider: context.Provider,
  overview,
  new: (obj?: ITabMenuWidget): ITabMenuWidget => {
    return newWidget({
      type: "tabMenu",
      data: {
        tabId: "tab1",
        horizontal: false,
        horizontalPosition: "left",
        items: []
      },
      ...obj
    });
  },
  form,
  display
} as WidgetIndex;
