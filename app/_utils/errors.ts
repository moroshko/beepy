type FormErrors<FieldName extends string> = Array<{
  field: FieldName;
  error: string;
}>;

type ApiErrorObject<FieldName extends string> = {
  message?: string;
  type?: string;
  formErrors?: FormErrors<FieldName>;
} & (
  | {
      message: string;
    }
  | {
      type: string;
    }
  | {
      formErrors: FormErrors<FieldName>;
    }
);

export class ApiError<FieldName extends string> extends Error {
  type: string | undefined;
  formErrors: FormErrors<FieldName> | undefined;

  constructor(error: ApiErrorObject<FieldName>) {
    const { message, type, formErrors } = error;

    super(message ?? "API error");

    this.type = type;
    this.formErrors = formErrors;
  }
}
