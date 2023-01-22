import { FormEventHandler, ReactNode } from "react";

type Props = {
  className?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

const Form = ({ className, onSubmit, children }: Props) => {
  return (
    <form className={className} method="post" noValidate onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export { Form };
