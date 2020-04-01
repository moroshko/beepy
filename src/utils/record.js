const MAX_BP = 400;
const MAX_PULSE = 300;

function extractNumber(str) {
  const number = str.substr(0, 3);

  if (+number <= MAX_BP) {
    return [number, str.substr(3)];
  }

  return [str.substr(0, 2), str.substr(2)];
}

function moreDigitsAllowed(str, max) {
  return str.length < String(max).length && +`${str}9` <= max;
}

function getCursor({ sys, dia, pulse }) {
  if (!moreDigitsAllowed(pulse, MAX_PULSE)) {
    return null;
  }

  if (pulse !== "") {
    return "pulse";
  }

  if (!moreDigitsAllowed(dia, MAX_BP)) {
    return "pulse";
  }

  if (dia !== "") {
    return "dia";
  }

  if (!moreDigitsAllowed(sys, MAX_BP)) {
    return "dia";
  }

  return "sys";
}

export function parseRecord(str) {
  const [sys, rest] = extractNumber(str);
  const [dia, pulse] = extractNumber(rest);
  const cursor = getCursor({ sys, dia, pulse });
  const isZeroAllowed =
    (cursor === "sys" && sys !== "") ||
    (cursor === "dia" && dia !== "") ||
    (cursor === "pulse" && pulse !== "");
  const moreDigitsAllowed = cursor !== null;

  return {
    sys: sys || null,
    dia: dia || null,
    pulse: pulse || null,
    cursor,
    isZeroAllowed,
    moreDigitsAllowed,
  };
}
