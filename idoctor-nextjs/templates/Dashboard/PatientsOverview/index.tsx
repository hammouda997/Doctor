import Icon from "@/components/Icon";
import Chart from "./Chart";
import LatestSales from "./LatestSales";

import {salesOverviewCRM} from "@/mocks/dashboard";
import {IPatient} from "@/types/IPatient";
import {IVisitOverview} from "@/types/IHomeData";

type PatientsOverviewProps = {
  latestPatients: IPatient[];
  visitOverview: IVisitOverview[];
};

const PatientsOverview = ({
  latestPatients,
  visitOverview,
}: PatientsOverviewProps) => {
  return (
    <div className="card">
      <div className="card-head mb-5.5">
        <div className="mr-auto text-h6">Aperçu des statistiques</div>
        <div className="flex mr-5 md:flex-col">
          <div className="flex items-center mr-5 text-xs font-bold md:mr-0">
            <div className="w-2 h-2 mr-1.5 rounded-full bg-purple-1"></div>
            Patients
          </div>
          <div className="flex items-center text-xs font-bold">
            <div className="w-2 h-2 mr-1.5 rounded-full bg-green-1"></div>
            Séances
          </div>
        </div>
        <button className="transition-colors text-0 hover:fill-purple-1 dark:fill-white dark:hover:fill-purple-1">
          <Icon className="icon-18 fill-inherit" name="calendar" />
        </button>
      </div>
      <Chart items={visitOverview} />
      <LatestSales latestPatients={latestPatients} />
    </div>
  );
};

export default PatientsOverview;
