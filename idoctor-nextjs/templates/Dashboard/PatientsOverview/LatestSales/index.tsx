import Icon from "@/components/Icon";
import {IPatient} from "@/types/IPatient";
import {format} from "date-fns";

type LatestSalesProps = {
  latestPatients: IPatient[];
};

const LatestSales = ({latestPatients}: LatestSalesProps) => (
  <div className="">
    <div className="flex justify-between items-center mb-4 px-5">
      <div className="font-bold">
        <div className="text-h6">Derniers patients</div>
      </div>
      <button
        onClick={() => {
          window.location.href = "/patients";
        }}
        className="text-xs font-bold transition-colors hover:text-purple-1"
      >
        Voir tout les patients
      </button>
    </div>
    <div className="table w-full">
      {latestPatients?.map((patient) => (
        <div className="table-row group" key={patient._id}>
          <div className="table-cell border-b border-n-1 align-middle py-2 pl-5 pr-2 text-sm group-last:pb-4 group-last:border-none dark:border-white">
            <div className="inline-flex items-center text-sm font-bold">
              {patient.fullName}
            </div>
          </div>
          <div className="table-cell border-b border-n-1 align-middle py-2 px-2 text-sm font-medium group-last:pb-4 group-last:border-none md:hidden dark:border-white">
            {patient.dob}
          </div>
          <div className="table-cell border-b border-n-1 align-middle py-2 px-2 text-right text-sm font-bold group-last:pb-4 group-last:border-none dark:border-white">
            {patient.gender}
          </div>
          <div className="table-cell border-b border-n-1 align-middle text-center py-2 px-2 text-sm group-last:pb-4 group-last:border-none md:hidden dark:border-white">
            {patient.createdAt &&
              format(new Date(patient.createdAt), "dd/MM/yyyy HH:mm")}
          </div>
          <div className="table-cell border-b border-n-1 align-middle text-right w-8 py-2 pl-2 pr-5 text-sm group-last:pb-4 group-last:border-none md:pr-3 dark:border-white">
            <button className="btn-transparent-dark btn-small btn-square">
              <Icon name="dots" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LatestSales;
