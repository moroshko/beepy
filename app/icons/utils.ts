import { IconProps } from "./Icon";
import * as iconsMap from "./index";

export type IconName = keyof typeof import("./index");

export const renderIcon = (icon: IconName, props: IconProps) => {
  return iconsMap[icon](props);
};
