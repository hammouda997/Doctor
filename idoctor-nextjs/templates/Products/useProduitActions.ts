import {api} from "@/api";
import {errorHandler} from "@/hooks/errorHandler";
import {DataTableFilter, PaginatedResponse, SelectValues} from "@/types/utils";
import {useState, useEffect} from "react";
import {SubmitHandler} from "react-hook-form";
import {emptyPaginationPayload} from ".";
import {getProducts} from "@/services/products";
import {IProduct} from "@/types/IProduct";

export const useProduitActions = () => {
  const [filter, setFilter] = useState<DataTableFilter>({
    keyword: "",
    direction: -1,
    sort: "",
    page: 1,
  });

  const [products, setProducts] = useState<PaginatedResponse<IProduct>>(
    emptyPaginationPayload
  );
  useEffect(() => {
    getProducts(filter).then((res) => {
      setProducts(res);
    });
  }, [filter]);

  const [visible, setVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IProduct | undefined>();
  const onConfirmDelete = async () => {
    try {
      selectedItem &&
        (await api.patch("/product", {
          _id: selectedItem._id,
          isDeleted: true,
        }));
      products.items &&
        setProducts({
          ...products,
          items: products.items.filter(
            (item) => item._id !== selectedItem?._id
          ),
        });
      setDeleteVisible(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      await api.patch("/product", data);

      if (products.items) {
        data._id
          ? setProducts({
              ...products,
              items: products.items.map((item) =>
                item._id === data._id ? data : item
              ),
            })
          : setProducts({
              ...products,
              items: [...products.items, data],
            });
      }
      setVisible(false);
    } catch (error) {
      errorHandler(error);
    }
  };
  const onDelete = (item: IProduct) => {
    setSelectedItem(item);
    setDeleteVisible(true);
  };
  const onEdit = (item: IProduct) => {
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
    products,
    onChangePage,
    filter,
    setFilter,
  };
};
