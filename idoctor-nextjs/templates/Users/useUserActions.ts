import {api} from "@/api";
import {errorHandler} from "@/hooks/errorHandler";
import {IUser} from "@/types/User";
import {DataTableFilter, PaginatedResponse, SelectValues} from "@/types/utils";
import {getUsers} from "@/services/users";
import {useState, useEffect} from "react";
import {SubmitHandler} from "react-hook-form";
import {emptyPaginationPayload} from ".";

export const useUserActions = () => {
  const [filter, setFilter] = useState<DataTableFilter>({
    keyword: "",
    direction: -1,
    sort: "",
    page: 1,
  });

  const [users, setUsers] = useState<PaginatedResponse<IUser>>(
    emptyPaginationPayload
  );

  useEffect(() => {
    getUsers(filter)
      .then((res) => {
        setUsers(res);
      })
      .catch(errorHandler);
  }, [filter]);

  const [visible, setVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IUser | undefined>();
  const onConfirmDelete = async () => {
    try {
      selectedItem &&
        (await api.delete("/user", {
          data: {
            _id: selectedItem._id,
          },
        }));
      setUsers({
        ...users,
        items: users.items.filter((item) => item._id !== selectedItem?._id),
      });
      setDeleteVisible(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      const response = await api.patch("/user", data);
      if (users.items) {
        data._id
          ? setUsers({
              ...users,
              items: users.items.map((item) =>
                item._id === data._id ? response.data : item
              ),
            })
          : setUsers({
              ...users,
              items: [...users.items, response.data],
            });
      }
      setVisible(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onDelete = (item: IUser) => {
    setSelectedItem(item);
    setDeleteVisible(true);
  };
  const onEdit = (item: IUser) => {
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
    users,
    onChangePage,
    filter,
    setFilter,
  };
};
