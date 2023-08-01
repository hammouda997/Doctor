import Icon from "@/components/Icon";

import {IPatient, IPatientVisit} from "@/types/IPatient";
import {IUser} from "@/types/User";
import {format} from "date-fns";

type LatestVisitsProps = {visits?: IPatientVisit[]};

const LatestVisits = ({visits}: LatestVisitsProps) => {
  return (
    <div className="card">
      <div className="card-head mb-5.5">
        <div className="mr-auto text-h6">Les rendez-vous du jour </div>
        <button className="transition-colors text-0 hover:fill-purple-1 dark:fill-white dark:hover:fill-purple-1">
          <Icon className="icon-18 fill-inherit" name="calendar" />
        </button>
      </div>

      <div>
        {visits?.map((customer) => (
          <div
            className="px-4 py-3 border-t border-n-1 first:border-none dark:border-white"
            key={customer._id}
          >
            <div className="flex justify-between item-center mb-1.5 font-bold text-sm">
              <div>{(customer.patient as IPatient).fullName}</div>
              <div>#visite N:{customer.visitId}</div>
            </div>

            <div className="mr-auto">
              <span className="relative -top-1 inline-block w-0.5 h-0.5 mx-1.5 rounded-full bg-n-1">
                {format(new Date(customer.startDate), "dd/MM/yyyy HH:mm")}
              </span>
            </div>
            <div className="mr-auto">
              <span className="font-bold">Docteur: </span>
              {(customer.medicalCareId.doctor as IUser).username}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestVisits;
