import { Button as UIButton } from "@/components/ui/button";
import cx from "clsx";
import { Loader2 } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

type Props = ComponentProps<typeof UIButton> & {
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      type = "button",
      asChild,
      loading = false,
      disabled = false,
      children,
      ...restProps
    },
    ref
  ) => {
    if (asChild) {
      return (
        <UIButton
          asChild={asChild}
          type={type}
          disabled={disabled || loading}
          {...restProps}
          ref={ref}
        >
          {children}
        </UIButton>
      );
    }

    return (
      <UIButton
        type={type}
        disabled={disabled || loading}
        {...restProps}
        ref={ref}
      >
        {loading && (
          <span className="absolute inset-0 grid place-items-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        )}
        <span className={cx(loading && "opacity-0")}>{children}</span>
      </UIButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
