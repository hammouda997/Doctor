import {IUser} from "@/types/User";
import {api} from "@/api";
import {PaginatedResponse} from "@/types/utils";
import {emptyPaginationPayload} from "@/templates/Users";
import {errorHandler} from "@/hooks/errorHandler";

export const getUsers = async (query: Record<string, unknown>) => {
  try {
    const {data} = await api.get<PaginatedResponse<IUser>>("/user/all", {
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
