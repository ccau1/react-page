import editor from "./editor";
import form from "./form";
import editorControl from "./editorControl";
import display from "./display";
import ObjectID from "bson-objectid";

export default {
  key: "text",
  name: "Text",
  editor,
  editorControl,
  new: (obj?: Widget): Widget => {
    return {
      _id: new ObjectID().toHexString(),
      idx: undefined,
      inlineStyle: "",
      userPermission: {
        delete: true,
        edit: true,
        move: true
      },
      hidden: false,
      mobileHidden: false,
      anchor: {
        hash: "about",
        top: 0
      },
      layout: {},
      type: "text",
      data: {
        text: ""
      },
      ...obj
    };
  },
  form,
  display
} as WidgetIndex;
