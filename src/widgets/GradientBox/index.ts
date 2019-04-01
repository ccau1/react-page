import editor from "./editor";
import form from "./form";
import editorControl from "./editorControl";
import display from "./display";
import { newWidget } from "../utils";

export default {
  key: "gradientBox",
  name: "Gradient Box",
  editor,
  editorControl,
  new: (obj?: Widget): Widget => {
    return newWidget({
      type: "gradientBox",
      data: {
        backgroundColor: "#fff",
        titleColor: "#d9d9d9",
        itemColor: "#d9d9d9",
        backgroundImg: "",
        title: "test title"
      },
      ...obj
    });
  },
  form,
  display
} as WidgetIndex;
