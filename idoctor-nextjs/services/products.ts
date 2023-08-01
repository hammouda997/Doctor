import {api} from "@/api";
import {PaginatedResponse} from "@/types/utils";
import {emptyPaginationPayload} from "@/templates/Patients";
import {errorHandler} from "@/hooks/errorHandler";
import {IProduct} from "@/types/IProduct";

export const getProducts = async (query: Record<string, unknown>) => {
  try {
    const {data} = await api.get<PaginatedResponse<IProduct>>("/product/all", {
      params: query,
    });

    return data;
  } catch (error) {
    errorHandler(error);
    return emptyPaginationPayload;
  }
};
