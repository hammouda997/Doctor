import {IPatient, IPatientVisit} from "./IPatient";

export interface IVisitOverview {
  month: string;
  patients: number;
  visits: number;
}
export interface IHomeData {
  visits: IPatientVisit[];
  latestPatients: IPatient[];
  nbrOfVisitsWeek: number;
  nbrOfVisitsToday: number;
  nbrOfVisitsMonth: number;
  visitOverview: IVisitOverview[];
}
