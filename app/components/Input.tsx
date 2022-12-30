import cx from "clsx";
import { ChangeEvent, FocusEvent, forwardRef, Ref, useId } from "react";

type Props = {
  type?: "text" | "email" | "password";
  label: string;
  error?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
};

const InputComponent = (props: Props, ref: Ref<HTMLInputElement>) => {
  const { type, label, error, name, onChange, onBlur } = props;
  const inputId = useId();
  const errorId = useId();

  return (
    <div className="w-full text-left">
      <label className="inline-block text-sm font-semibold" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={cx(
          "mt-1 w-full rounded border px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500",
          error
            ? "border-red-600 focus:ring-red-600"
            : "border-grey-600 focus:ring-primary-500"
        )}
        name={name}
        type={type}
        {...(error && { "aria-describedby": errorId })}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

const Input = forwardRef(InputComponent);

export { Input };
