import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Sorting from "@/components/Sorting";
import TablePagination from "@/components/TablePagination";
import Row from "./Row";

import AddPatientModal from "@/components/Modal/AddPatientModal";
import Modal from "@/components/Modal";
import {usePatientActions} from "./usePatientActions";
import Search from "@/components/Search";
export const emptyPaginationPayload = {
  page: 1,
  hasNextPage: false,
  items: [],
  totalItems: 0,
  totalPages: 1,
};

const Patients = () => {
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
    patients,
    onChangePage,
    filter,
    setFilter,
  } = usePatientActions();
  return (
    <Layout title="Patients">
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

      <table className="table-custom">
        <thead>
          <tr>
            <th className="th-custom">
              <Sorting title="Nom" />
            </th>
            <th className="th-custom">
              <Sorting title="Date de naissance" />
            </th>
            <th className="th-custom">
              <Sorting title="Telephone" />
            </th>
            <th className="th-custom">
              <Sorting title="Genre" />
            </th>
            <th className="th-custom text-right">
              <Sorting title="Date de Creation" />
            </th>
            <th className="th-custom text-right"></th>
          </tr>
        </thead>
        <tbody>
          {patients?.items?.map((patient) => (
            <Row
              item={patient}
              key={patient._id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
      <TablePagination
        changePage={onChangePage}
        currentPage={patients.page}
        totalPages={patients.totalPages}
      />
      <AddPatientModal
        defaultValues={selectedItem}
        setVisible={setVisible}
        visible={visible}
        onSubmit={onSubmit}
      />
      <Modal
        title="Supprimer Patient"
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
      >
        <div className="m-2 font-bold">
          {'Voulez-vous vraiment supprimer "' + selectedItem?.fullName + " ?"}
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

export default Patients;
