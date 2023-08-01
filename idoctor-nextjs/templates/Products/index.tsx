import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Sorting from "@/components/Sorting";
import TablePagination from "@/components/TablePagination";
import Row from "./Row";
import AddProductModal from "@/components/Modal/AddProductModal";
import {useProduitActions} from "./useProduitActions";
import Modal from "@/components/Modal";
import Search from "@/components/Search";
export const emptyPaginationPayload = {
  page: 1,
  hasNextPage: false,
  items: [],
  totalItems: 0,
  totalPages: 1,
};

const Charges = () => {
  const {
    onEdit,
    onDelete,
    onSubmit,
    selectedItem,
    setDeleteVisible,
    deleteVisible,
    onConfirmDelete,
    visible,
    setVisible,
    products,
    onChangePage,
    filter,
    setFilter,
  } = useProduitActions();

  return (
    <Layout title="Produits">
      <div className="flex justify-between mb-6 md:block md:mb-5">
        <Search
          className="max-w-[41.25rem]"
          placeholder="Rechercher un patient"
          value={filter?.keyword}
          onChange={(e: any) => setFilter({...filter, keyword: e.target.value})}
        />
        <button
          onClick={() => setVisible(true)}
          className="btn-purple btn-medium px-5"
        >
          <Icon name="plus" />
          <span>Ajouter</span>
        </button>
      </div>

      <table className="table-custom table-select">
        <thead>
          <tr>
            <th className="th-custom text-right"></th>
            <th className="th-custom">
              <Sorting title="Nom" />
            </th>
            <th className="th-custom">
              <Sorting title="stock" />
            </th>
            <th className="th-custom">
              <Sorting title="Stock Alert" />
            </th>
            <th className="th-custom">
              <Sorting title="description" />
            </th>
            <th className="th-custom text-right">
              <Sorting title="brand" />
            </th>
            <th className="th-custom text-right"></th>
          </tr>
        </thead>
        <tbody>
          {products?.items?.map((prod) => (
            <Row
              item={prod}
              key={prod._id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
      <TablePagination
        changePage={onChangePage}
        currentPage={products.page}
        totalPages={products.totalPages}
      />
      <AddProductModal
        onSubmit={onSubmit}
        defaultValues={selectedItem}
        setVisible={setVisible}
        visible={visible}
      ></AddProductModal>
      <Modal
        title="Supprimer Patient"
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
      >
        <div className="m-2 font-bold">
          {'Voulez-vous vraiment supprimer "' + selectedItem?.name + " ?"}
        </div>

        <div className="flex justify-end mb-6 md:block md:mb-5">
          <button
            onClick={() => setDeleteVisible(false)}
            className="btn-stroke btn-small mr-2.5 md:grow"
          >
            <span>{"Annuler"}</span>
          </button>
          <button
            onClick={onConfirmDelete}
            className="btn-purple btn-small mr-2.5 md:grow"
          >
            <Icon name="plus" />
            <span>{"Confirmer"}</span>
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default Charges;
