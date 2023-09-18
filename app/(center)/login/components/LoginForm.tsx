"use client";

import { useState } from "react";
import { EmailForm } from "./EmailForm";
import { LoginVerificationCodeForm } from "./LoginVerificationCodeForm";

const LoginForm = () => {
  const [email, setEmail] = useState<string | null>(null);

  return email === null ? (
    <EmailForm onSuccess={setEmail} />
  ) : (
    <LoginVerificationCodeForm email={email} />
  );
};

export { LoginForm };
