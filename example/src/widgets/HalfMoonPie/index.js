import editor from "./editor";
import form from "./form";
import editorControl from "./editorControl";
import display from "./display";
import { utils } from "react-page";

export default {
  key: "halfMoonPie",
  name: "Half Moon Pie",
  editor,
  editorControl,
  new: obj => {
    return utils.newWidget({
      type: "halfMoonPie",
      data: {
        title: "test title",
        subtitle: "test subtitle",
        img:
          "http://www-testing.httpeace.com:3400/static/images/technologies_landing.png"
      },
      ...obj
    });
  },
  form,
  display
};
