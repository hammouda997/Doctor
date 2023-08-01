/* eslint-disable @typescript-eslint/no-explicit-any */
import {FilterQuery} from "mongoose";
import {paginationAggregate} from "./paginationAggrigation";

type paginationPipelineProps<T extends unknown> = {
  page: string;
  filter?: FilterQuery<Partial<T>>;
  sort?: FilterQuery<Partial<T>>;
  group?: FilterQuery<Partial<T>>;
  pageLimit?: string;
};
export const paginationPipeline = <T extends unknown>({
  page = "1",
  filter = {},
  sort = {createdAt: -1},
  pageLimit,
}: paginationPipelineProps<T>): any => {
  const limit = Number(pageLimit) || 10;
  const skip = (Number(page) - 1) * limit;

  return [
    {
      $match: {
        ...filter,
      },
    },
    {
      $sort: {
        ...sort,
      },
    },
    {
      $facet: {
        total: [
          {
            $count: "count",
          },
        ],
        data: [
          {
            $addFields: {
              _id: "$_id",
            },
          },
        ],
      },
    },
    ...paginationAggregate(skip, limit, page),
  ];
};
