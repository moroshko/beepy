import cx from "clsx";
import {
  ChangeEvent,
  ElementRef,
  FocusEvent,
  Ref,
  forwardRef,
  useId,
} from "react";

type Props = {
  type?: "text" | "email";
  label: string;
  placeholder?: string;
  inputMode?: "numeric";
  autoFocus?: boolean;
  error?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
};

const InputComponent = (props: Props, ref: Ref<ElementRef<"input">>) => {
  const {
    type = "text",
    label,
    placeholder,
    inputMode,
    autoFocus,
    error,
    name,
    onChange,
    onBlur,
  } = props;
  const id = useId();
  const inputId = `${id}-input`;
  const errorId = `${id}-error`;

  return (
    <div className="w-full text-left">
      <label className="inline-block text-sm font-semibold" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={cx(
          // appearance-none is needed for iOS. See: https://stackoverflow.com/a/15440636/247243
          "mt-1 w-full appearance-none rounded border px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500",
          error
            ? "border-red-600 focus:ring-red-600"
            : "border-gray-600 focus:ring-primary-500"
        )}
        type={type}
        name={name}
        placeholder={placeholder}
        inputMode={inputMode}
        autoFocus={autoFocus}
        {...(error && { "aria-describedby": errorId })}
        onChange={onChange}
        onBlur={onBlur}
        spellCheck="false"
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
