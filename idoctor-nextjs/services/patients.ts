import {IPatient} from "@/types/IPatient";
import {api} from "@/api";
import {PaginatedResponse} from "@/types/utils";
import {emptyPaginationPayload} from "@/templates/Patients";
import {errorHandler} from "@/hooks/errorHandler";
import {IMedicalCareListType} from "@/types/IMedicalCare";

export const getPatients = async (query: Record<string, unknown>) => {
  try {
    const {data} = await api.get<PaginatedResponse<IPatient>>("/patient/all", {
      params: {
        ...query,
      },
    });

    return data;
  } catch (error) {
    errorHandler(error);
    return emptyPaginationPayload;
  }
};
export const getMedicalCares = async (query: Record<string, unknown>) => {
  try {
    const {data} = await api.get<PaginatedResponse<IMedicalCareListType>>(
      "/charges/all",
      {
        params: {
          ...query,
        },
      }
    );

    return data;
  } catch (error) {
    errorHandler(error);
    return emptyPaginationPayload;
  }
};
