import { Icon, IconProps } from "./Icon";

const XIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
};

export { XIcon };
