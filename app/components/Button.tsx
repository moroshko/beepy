import cx from "clsx";
import { ElementRef, forwardRef, ReactNode, Ref } from "react";

type Props = {
  variant?: "primary" | "danger";
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

const Button = forwardRef((props: Props, ref: Ref<ElementRef<"button">>) => {
  const {
    variant = "primary",
    type = "button",
    fullWidth = false,
    disabled = false,
    loading = false,
    onClick,
    children,
  } = props;

  return (
    <button
      className={cx(
        "relative min-w-[80px] rounded px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        variant === "primary" && "bg-primary-500",
        variant === "primary" &&
          !disabled &&
          !loading &&
          "hover:bg-primary-600",
        variant === "danger" && "bg-red-500",
        variant === "danger" && !disabled && !loading && "hover:bg-red-600",
        fullWidth && "w-full",
        disabled || loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      ref={ref}
    >
      {loading && (
        <span className="absolute inset-0 grid place-items-center">
          <span
            className="block h-6 w-6 animate-spin rounded-full border-4 border-white/50 border-t-white"
            aria-hidden="true"
          />
        </span>
      )}
      <span className={cx(loading && "opacity-0")}>{children}</span>
    </button>
  );
});

Button.displayName = "Button";

export { Button };
