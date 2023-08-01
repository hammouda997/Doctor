export const paginationAggregate = (
  skip: number,
  limit: number,
  page: string,
) => [
  {
    $unwind: '$total',
  },
  {
    $project: {
      items: {
        $slice: [
          '$data',
          skip,
          {
            $ifNull: [limit, '$total.count'],
          },
        ],
      },
      page: {
        $literal: skip / limit + 1,
      },
      hasNextPage: {
        $lt: [{ $multiply: [limit, Number(page)] }, '$total.count'],
      },
      totalPages: {
        $ceil: {
          $divide: ['$total.count', limit],
        },
      },
      totalItems: '$total.count',
    },
  },
];
