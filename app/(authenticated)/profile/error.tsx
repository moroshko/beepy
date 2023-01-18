"use client";

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return (
    <div className="text-error">
      <h1 className="mb-4 text-xl font-medium">Error</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
