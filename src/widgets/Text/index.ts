import editor from "./editor";
import form from "./form";
import editorControl from "./editorControl";
import display from "./display";
import { newWidget } from "../utils";

export default {
  key: "text",
  name: "Text",
  editor,
  editorControl,
  new: (obj?: Widget): Widget => {
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
