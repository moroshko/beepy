import { FormEventHandler, ReactNode } from "react";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

const Form = ({ onSubmit, children }: Props) => {
  return (
    <form className="space-y-6" method="post" noValidate onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export { Form };
