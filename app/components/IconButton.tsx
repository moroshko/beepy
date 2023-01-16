import { IconName, renderIcon } from "icons/utils";
import {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  Ref,
} from "react";

type Props = {
  icon: IconName;
  "aria-label": string;
  // The props below are provided by `Disclosure.Button`
  "aria-expanded"?: boolean;
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onKeyUp?: KeyboardEventHandler<HTMLButtonElement>;
};

const IconButtonComponent = (props: Props, ref: Ref<HTMLButtonElement>) => {
  console.log(props);
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
      className="grid h-10 w-10 place-items-center rounded hover:bg-grey-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
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
