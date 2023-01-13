import cx from "clsx";
import { ReactNode } from "react";

type Props = {
  variant?: "primary" | "danger";
  type?: "button" | "submit";
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
};

const Button = ({
  variant = "primary",
  type = "button",
  fullWidth = false,
  loading = false,
  children,
}: Props) => {
  return (
    <button
      className={cx(
        "relative rounded py-2 px-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        variant === "primary" && "bg-primary-500 hover:bg-primary-600",
        variant === "danger" && "bg-red-500 hover:bg-red-600",
        fullWidth && "w-full",
        loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
      disabled={loading}
      type={type}
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
};

export { Button };
