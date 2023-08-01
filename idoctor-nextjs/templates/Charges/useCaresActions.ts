import {getMedicalCares} from "@/services/patients";
import {api} from "@/api";
import {errorHandler} from "@/hooks/errorHandler";
import {DataTableFilter, PaginatedResponse, SelectValues} from "@/types/utils";
import {useState, useEffect} from "react";
import {SubmitHandler} from "react-hook-form";
import {emptyPaginationPayload} from ".";
import {IMedicalCareListType} from "@/types/IMedicalCare";
import {useRouter} from "next/router";

export const useCaresActions = () => {
  const [filter, setFilter] = useState<DataTableFilter>({
    keyword: "",
    direction: -1,
    sort: "",
    page: 1,
  });

  const [caresList, setMedicalCare] = useState<
    PaginatedResponse<IMedicalCareListType>
  >(emptyPaginationPayload);

  useEffect(() => {
    getMedicalCares(filter)
      .then((res) => {
        setMedicalCare(res);
      })
      .catch(errorHandler);
  }, [filter]);
  const [visible, setVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<
    IMedicalCareListType | undefined
  >();
  const onConfirmDelete = async () => {
    try {
      selectedItem &&
        (await api.delete("/patient", {
          data: {
            _id: selectedItem._id,
          },
        }));
      setMedicalCare({
        ...caresList,
        items: caresList.items.filter((item) => item._id !== selectedItem?._id),
      });
      setDeleteVisible(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onSubmit: SubmitHandler<IMedicalCareListType> = async (data) => {
    try {
      const response = await api.patch("/medical-care", data);
      if (caresList.items) {
        data._id
          ? setMedicalCare({
              ...caresList,
              items: caresList.items.map((item) =>
                item._id === data._id ? response.data : item
              ),
            })
          : setMedicalCare({
              ...caresList,
              items: [...caresList.items, response.data],
            });
      }
      setVisible(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onDelete = (item: IMedicalCareListType) => {
    setSelectedItem(item);
    setDeleteVisible(true);
  };
  const router = useRouter();
  const onEdit = (item: IMedicalCareListType) => {
    router.push(`/charges/${item._id}`);
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
    caresList,
    onChangePage,
    filter,
    setFilter,
  };
};
