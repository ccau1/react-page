import * as _utils from "./utils";

import GradientBox from "./GradientBox";
import LayoutBuilder from "./LayoutBuilder";
import List from "./List";
import Text from "./Text";
import TabMenu from "./TabMenu";
import TabContent from "./TabContent";
import Image from "./Image";

export const utils = _utils;

export const widgets = {};
widgets[LayoutBuilder.key] = LayoutBuilder;
widgets[Text.key] = Text;
widgets[Image.key] = Image;
widgets[GradientBox.key] = GradientBox;
widgets[TabMenu.key] = TabMenu;
widgets[TabContent.key] = TabContent;
widgets[List.key] = List;
