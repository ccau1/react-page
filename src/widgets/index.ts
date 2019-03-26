import * as _utils from "./utils";

import LayoutBuilder from "./LayoutBuilder";
import Text from "./Text";
import Image from "./Image";

export const utils = _utils;

export const widgets = {};
widgets[LayoutBuilder.key] = LayoutBuilder;
widgets[Text.key] = Text;
widgets[Image.key] = Image;
