import editor from "./editor";
import form from "./form";
import editorControl from "./editorControl";
import display from "./display";
import { newWidget } from "../utils";

export default {
  key: "image",
  name: "Image",
  editor,
  editorControl,
  new: (obj?: Widget): Widget => {
    return newWidget({
      type: "image",
      data: {
        src: "",
        width: "",
        height: "",
        fit: "cover",
        position: "center"
      },
      ...obj
    });
  },
  form,
  display
} as WidgetIndex;
