import Link from "next/link";
import Icon from "@/components/Icon";
import {format} from "date-fns";
import {IUser} from "@/types/User";

type RowProps = {
  item: IUser;
  onEdit: (item: IUser) => void;
  onDelete: (item: IUser) => void;
};

const Row = ({item, onDelete, onEdit}: RowProps) => {
  return (
    <tr className="">
      <td className="td-custom">
        <Link
          className="flex items-center text-sm font-bold transition-colors hover:text-purple-1"
          href={"/users/" + item._id}
        >
          {item.fullName}
        </Link>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center">{item.email}</div>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center">
          <div className="2xl:max-w-[9rem]">{item.role}</div>
        </div>
      </td>

      <td className="td-custom text-right">
        {item.createdAt && format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}
      </td>
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
