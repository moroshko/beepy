const ConfirmEmailPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }; // Meh. See also: https://beta.nextjs.org/docs/api-reference/use-search-params#searchparams-in-pages
}) => {
  const { email } = searchParams ?? {};

  return (
    <>
      <h1 className="text-2xl font-semibold">Confirm email address</h1>
      <p className="mt-6">
        We emailed you instructions to
        <br />
        <span className="font-semibold">{email}</span>
      </p>
    </>
  );
};

export default ConfirmEmailPage;
