const isSysValid = (sysStr: string): boolean => {
  const sys = Number(sysStr);

  return sys >= 20 && sys <= 400;
};

const isDiaValid = (diaStr: string): boolean => {
  const dia = Number(diaStr);

  return dia >= 20 && dia <= 400;
};

const isPulseValid = (pulseStr: string): boolean => {
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
