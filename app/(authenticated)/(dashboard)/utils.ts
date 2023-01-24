const allowedCodes = [
  "Tab",
  "Backspace",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
  "Digit0",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
];

export const isCodeAllowed = (code: string): boolean => {
  return allowedCodes.includes(code);
};

export const isSysValid = (sysStr: string): boolean => {
  const sys = Number(sysStr);

  return sys >= 20 && sys <= 400;
};

export const isDiaValid = (diaStr: string): boolean => {
  const dia = Number(diaStr);

  return dia >= 20 && dia <= 400;
};

export const isPulseValid = (pulseStr: string): boolean => {
  const pulse = Number(pulseStr);

  return pulse >= 20 && pulse <= 300;
};

export const isRecordValid = ({
  sys,
  dia,
  pulse,
}: {
  sys: string;
  dia: string;
  pulse: string;
}): boolean => {
  return isSysValid(sys) && isDiaValid(dia) && isPulseValid(pulse);
};

type AddRecordState =
  | {
      type: "initial";
    }
  | {
      type: "adding";
    }
  | {
      type: "added";
    }
  | {
      type: "error";
      error: string;
    };

type AddRecordAction =
  | { type: "add" }
  | { type: "cancel" }
  | { type: "success" }
  | { type: "success-timeout" }
  | { type: "error"; error: string };

export const addRecordReducer = (
  state: AddRecordState,
  action: AddRecordAction
): AddRecordState => {
  switch (action.type) {
    case "add": {
      return {
        type: "adding",
      };
    }
    case "cancel": {
      return {
        type: "initial",
      };
    }
    case "success": {
      return {
        type: "added",
      };
    }
    case "success-timeout": {
      return {
        type: "initial",
      };
    }
    case "error": {
      return action;
    }
  }
};
