const CheckYourEmailPage = ({
  searchParams,
}: {
  searchParams: Record<string, string>; // Meh. See also: https://beta.nextjs.org/docs/api-reference/use-search-params#searchparams-in-pages
}) => {
  const { email } = searchParams;

  return (
    <>
      <h1 className="text-2xl font-semibold">Check your email</h1>
      <p className="mt-6">
        {`We emailed you reset instructions to `}
        <span className="whitespace-nowrap font-semibold">{email}</span>
      </p>
    </>
  );
};

export default CheckYourEmailPage;
