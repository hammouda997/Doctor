import {getPatients} from "@/services/patients";
import {api} from "@/api";
import {errorHandler} from "@/hooks/errorHandler";
import {IPatient} from "@/types/IPatient";
import {DataTableFilter, PaginatedResponse, SelectValues} from "@/types/utils";
import {useState, useEffect} from "react";
import {SubmitHandler} from "react-hook-form";
import {emptyPaginationPayload} from ".";

export const usePatientActions = () => {
  const [filter, setFilter] = useState<DataTableFilter>({
    keyword: "",
    direction: -1,
    sort: "",
    page: 1,
  });

  const [patients, setPatients] = useState<PaginatedResponse<IPatient>>(
    emptyPaginationPayload
  );

  useEffect(() => {
    getPatients(filter)
      .then((res) => {
        setPatients(res);
      })
      .catch(errorHandler);
  }, [filter]);
  const [visible, setVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IPatient | undefined>();
  const onConfirmDelete = async () => {
    try {
      selectedItem &&
        (await api.delete("/patient", {
          data: {
            _id: selectedItem._id,
          },
        }));
      setPatients({
        ...patients,
        items: patients.items.filter((item) => item._id !== selectedItem?._id),
      });
      setDeleteVisible(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onSubmit: SubmitHandler<IPatient> = async (data) => {
    try {
      if (data.gender && typeof data.gender !== "string") {
        data.gender = (data.gender as SelectValues).value;
      }
      if (
        data.socialAssuranceType &&
        typeof data.socialAssuranceType !== "string"
      )
        data.socialAssuranceType = (
          data.socialAssuranceType as SelectValues
        ).value;
      const response = await api.patch("/patient", data);
      if (patients.items) {
        data._id
          ? setPatients({
              ...patients,
              items: patients.items.map((item) =>
                item._id === data._id ? response.data : item
              ),
            })
          : setPatients({
              ...patients,
              items: [...patients.items, response.data],
            });
      }
      setVisible(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onDelete = (item: IPatient) => {
    setSelectedItem(item);
    setDeleteVisible(true);
  };
  const onEdit = (item: IPatient) => {
    setSelectedItem(item);
    setVisible(true);
  };
  const onChangePage = (page: number) => {
    setFilter({...filter, page});
  };

  return {
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
  };
};
