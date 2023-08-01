import Icon from "@/components/Icon";
import {DataTableFilter} from "@/types/utils";

type TablePaginationProps = {
  changePage: (page: number) => void;
  currentPage: number;
  totalPages: number;
};

const TablePagination = ({
  changePage,
  currentPage = 1,
  totalPages = 1,
}: TablePaginationProps) => (
  <div className="flex justify-between items-center mt-6 md:mt-5">
    <button
      onClick={() => (currentPage > 1 ? changePage(currentPage - 1) : null)}
      className="btn-stroke btn-small"
    >
      <Icon name="arrow-prev" />
      <span>Prev</span>
    </button>
    <div className="text-sm font-bold">
      Page {currentPage} / {totalPages}
    </div>
    <button
      className="btn-stroke btn-small ml-12"
      onClick={() =>
        currentPage < totalPages ? changePage(currentPage + 1) : null
      }
    >
      <span>Next</span>
      <Icon name="arrow-next" />
    </button>
  </div>
);

export default TablePagination;
