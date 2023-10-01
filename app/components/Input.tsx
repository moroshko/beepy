import { Input as UIInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentProps, forwardRef, useId } from "react";

type Props = Omit<ComponentProps<typeof UIInput>, "id"> & {
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...restProps }, ref) => {
    const id = useId();
    const inputId = `${id}-input`;
    const errorId = `${id}-error`;
    const hasError = error !== undefined;

    return (
      <div className="flex flex-col gap-2 text-left">
        <Label className="self-start" htmlFor={inputId}>
          {label}
        </Label>
        <UIInput
          {...restProps}
          id={inputId}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          spellCheck={false}
          ref={ref}
        />
        {hasError && (
          <p className="text-sm leading-none text-error" id={errorId}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
