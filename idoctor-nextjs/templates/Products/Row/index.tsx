import Link from "next/link";
import Icon from "@/components/Icon";
import {IProduct} from "@/types/IProduct";

type RowProps = {
  item: IProduct;
  onEdit: (item: IProduct) => void;
  onDelete: (item: IProduct) => void;
};

const Row = ({item, onDelete, onEdit}: RowProps) => {
  return (
    <tr className="">
      <td className="td-custom"></td>
      <td className="td-custom">
        <Link
          className="flex items-center text-sm font-bold transition-colors hover:text-purple-1"
          href="/patient/details"
        >
          {item.name}
        </Link>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center font-bold">{item.stock}</div>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center">
          <div className="2xl:max-w-[9rem] 2xl:truncate font-bold">
            {item.stockAlert}
          </div>
        </div>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center">{item.description}</div>
      </td>
      <td className="td-custom text-right font-bold">{item.brand}</td>
      <td className="td-custom text-right">
        <button
          onClick={() => onEdit(item)}
          className="btn-stroke btn-small m-1.5 md:grow"
        >
          <Icon name="edit" />
        </button>
        <button
          onClick={() => onDelete(item)}
          className="btn-stroke btn-small md:grow"
        >
          <Icon name="remove" />
        </button>
      </td>
    </tr>
  );
};

export default Row;
