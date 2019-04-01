import editor from "./editor";
import form from "./form";
import editorControl from "./editorControl";
import display from "./display";
import { newWidget } from "../utils";

export type TextDataTextAlign = "left" | "center" | "right";
export type TextDataHeading = "h1" | "h2" | "h3" | "h4" | "p" | "small";

export type TextData = {
  text: string;
  textAlign: TextDataTextAlign;
  heading: TextDataHeading;
};

export interface ITextWidget extends Widget {
  data: TextData;
}

export default {
  key: "text",
  name: "Text",
  editor,
  editorControl,
  new: (obj?: ITextWidget): ITextWidget => {
    return newWidget({
      type: "text",
      data: {
        text: "",
        textAlign: "left",
        heading: "p"
      },
      ...obj
    });
  },
  form,
  display
} as WidgetIndex;
