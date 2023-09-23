import { IconName, renderIcon } from "@/icons/utils";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  Ref,
  forwardRef,
} from "react";

type Props = {
  icon: IconName;
  "aria-label": string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  // The props below are provided by `Disclosure.Button`
  "aria-expanded"?: boolean;
  id?: string;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onKeyUp?: KeyboardEventHandler<HTMLButtonElement>;
};

const IconButtonComponent = (props: Props, ref: Ref<HTMLButtonElement>) => {
  const {
    icon,
    "aria-label": ariaLabel,
    "aria-expanded": ariaExpanded,
    id,
    onClick,
    onKeyDown,
    onKeyUp,
  } = props;

  return (
    <button
      id={id}
      className="hover:bg-gray-100 grid h-10 w-10 place-items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      type="button"
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      ref={ref}
    >
      {renderIcon(icon, { size: 24 })}
    </button>
  );
};

const IconButton = forwardRef(IconButtonComponent);

export { IconButton };
