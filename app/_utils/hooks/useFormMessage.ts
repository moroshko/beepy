import { useEffect, useReducer } from "react";

type FormMessage = null | {
  type: "warning" | "success" | "error";
  message: string;
};

type FormMessageAction =
  | { type: "form-submitted" }
  | { type: "form-dirty" }
  | { type: "success"; message: string }
  | { type: "success-timeout" }
  | { type: "error"; message: string };

const formMessageReducer = (
  state: FormMessage,
  action: FormMessageAction
): FormMessage => {
  switch (action.type) {
    case "form-submitted": {
      return null;
    }
    case "form-dirty": {
      return state === null || state.type === "success"
        ? {
            type: "warning",
            message: "You have unsaved changes",
          }
        : state;
    }
    case "success": {
      return action;
    }
    case "success-timeout": {
      return state?.type === "success" ? null : state;
    }
    case "error": {
      return action;
    }
  }
};

export const useFormMessage = ({ isFormDirty }: { isFormDirty: boolean }) => {
  const [formMessage, dispatch] = useReducer(formMessageReducer, null);

  useEffect(() => {
    if (isFormDirty) {
      dispatch({ type: "form-dirty" });
    }
  }, [isFormDirty]);

  return [formMessage, dispatch] as const;
};
