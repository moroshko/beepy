import { ReactNode } from "react";

export type IconSize = 24;

const sizeMap: Record<IconSize, string> = {
  24: "w-6 h-6",
};

export type IconProps = {
  size: IconSize;
};

type Props = IconProps & {
  children: ReactNode;
};

const Icon = ({ size, children }: Props) => {
  return (
    <svg
      className={sizeMap[size]}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
};

export { Icon };
