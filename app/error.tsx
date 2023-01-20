"use client";

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return (
    <div className="p-4 text-error">
      <h1 className="mb-4 text-xl font-medium">Error</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
