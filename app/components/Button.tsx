import { Button as UIButton } from "@/components/ui/button";
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
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
      </UIButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
