"use client";

import { useState } from "react";
import { EmailForm } from "./EmailForm";
import { VerificationCodeForm } from "./VerificationCodeForm";

const LoginForm = () => {
  const [email, setEmail] = useState<string | null>(null);

  return email === null ? (
    <EmailForm onSuccess={setEmail} />
  ) : (
    <VerificationCodeForm email={email} />
  );
};

export { LoginForm };
