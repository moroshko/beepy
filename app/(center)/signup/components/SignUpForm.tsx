"use client";

import { useState } from "react";
import { EmailForm } from "./EmailForm";
import { SignUpVerificationCodeForm } from "./SignUpVerificationCodeForm";

const SignUpForm = () => {
  const [email, setEmail] = useState<string | null>(null);

  return email === null ? (
    <EmailForm onSuccess={setEmail} />
  ) : (
    <SignUpVerificationCodeForm email={email} />
  );
};

export { SignUpForm };
