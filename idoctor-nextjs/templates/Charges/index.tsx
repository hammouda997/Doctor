import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Sorting from "@/components/Sorting";
import TablePagination from "@/components/TablePagination";
import Row from "./Row";
import Modal from "@/components/Modal";
import {useCaresActions} from "./useCaresActions";
import Search from "@/components/Search";
import {useRouter} from "next/router";
export const emptyPaginationPayload = {
  page: 1,
  hasNextPage: false,
  items: [],
  totalItems: 0,
  totalPages: 1,
};

const MedicalCaresList = () => {
  const {
    onEdit,
    onDelete,
    setDeleteVisible,
    deleteVisible,
    onConfirmDelete,
    caresList,
    onChangePage,
    filter,
    setFilter,
  } = useCaresActions();
  const router = useRouter();
  return (
    <Layout title="Prise en charges">
      <div className="flex justify-between mb-6 md:block md:mb-5">
        <Search
          className="max-w-[41.25rem]"
          placeholder="Rechercher un patient"
          value={filter?.keyword}
          onChange={(e: any) => setFilter({...filter, keyword: e.target.value})}
        />
        <button
          onClick={() => router.push("/charges/new")}
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
              <Sorting title="Nom patient" />
            </th>
            <th className="th-custom">
              <Sorting title="Docteur" />
            </th>
            <th className="th-custom">
              <Sorting title="Kiné" />
            </th>
            <th className="th-custom">
              <Sorting title="Nbr vistis" />
            </th>
            <th className="th-custom text-right">
              <Sorting title="Date de Creation" />
            </th>
            <th className="th-custom text-right"></th>
          </tr>
        </thead>
        <tbody>
          {caresList?.items?.map((patient) => (
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
        currentPage={caresList.page}
        totalPages={caresList.totalPages}
      />
      <Modal
        title="Supprimer Patient"
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
      >
        <div className="m-2 font-bold">
          {"Voulez-vous vraiment supprimer  ?"}
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

export default MedicalCaresList;
