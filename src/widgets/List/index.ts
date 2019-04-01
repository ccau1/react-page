import editor from "./editor";
import form from "./form";
import editorControl from "./editorControl";
import display from "./display";
import { newWidget } from "../utils";

export type ListDataType =
  | "circle"
  | "square"
  | "numeric"
  | "upper-roman"
  | "lower-roman"
  | "upper-alpha"
  | "lower-alpha"
  | "custom";

export type ListData = {
  type: string;
  items: ListDataItem[];
};
export type ListDataItem = { text: string };

export interface IListWidget extends Widget {
  data: ListData;
}

export default {
  key: "list",
  name: "List",
  editor,
  editorControl,
  new: (obj?: IListWidget): IListWidget => {
    return newWidget({
      type: "list",
      data: {
        type: "circle",
        items: []
      },
      ...obj
    });
  },
  form,
  display
} as WidgetIndex;
