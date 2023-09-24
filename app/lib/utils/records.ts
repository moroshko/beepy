import { KeyboardEventHandler } from "react";

const allowedCodes = [
  "Tab",
  "Backspace",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
  "Escape",
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

export const preventDefaultIfCodeNotAllowed: KeyboardEventHandler<
  HTMLInputElement
> = (event) => {
  if (allowedCodes.includes(event.code) === false) {
    event.preventDefault();
  }
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
