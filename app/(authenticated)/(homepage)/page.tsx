import { getRecords } from "@/api/records/utils";
import { getUserIdOrRedirectToLogin } from "@/lib/utils/pages";
import { Records } from "./components/Records";

const HomePage = async () => {
  const userId = await getUserIdOrRedirectToLogin();
  const records = await getRecords(userId);

  return (
    <div className="-mx-4 mt-4 flex justify-center xs:mx-0 xs:mt-8">
      <Records initialRecords={records} />
    </div>
  );
};

export default HomePage;
