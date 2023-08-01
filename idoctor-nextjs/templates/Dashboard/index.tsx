import Layout from "@/components/Layout";
import Statistics from "./Statistics";
import SalesOverview from "./PatientsOverview";
import LatestVisits from "./LatestVisits";
import {useHome} from "./useHome";

const HomePage = () => {
  const {
    filter,
    stats: {visits, latestPatients, visitOverview, ...stats},
    setFilter,
  } = useHome();
  return (
    <Layout title="Accueil">
      <div className="flex -mx-2.5 lg:block lg:mx-0">
        <div className="w-[calc(66.666%-1.25rem)] mx-2.5 lg:w-full lg:mx-0 lg:mb-5">
          <Statistics stats={stats} />
          <SalesOverview
            visitOverview={visitOverview}
            latestPatients={latestPatients}
          />
        </div>
        <div className="w-[calc(33.333%-1.25rem)] mx-2.5 lg:w-full lg:mx-0">
          <LatestVisits visits={visits} />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
