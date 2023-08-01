import Link from "next/link";
import Icon from "@/components/Icon";
import {IPatient} from "@/types/IPatient";
import {format} from "date-fns";

type RowProps = {
  item: IPatient;
  onEdit: (item: IPatient) => void;
  onDelete: (item: IPatient) => void;
};

const Row = ({item, onDelete, onEdit}: RowProps) => {
  return (
    <tr className="">
      <td className="td-custom">
        <div className="flex items-center text-sm font-bold transition-colors hover:text-purple-1">
          {item.fullName}
        </div>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center">
          {item.dob ? format(new Date(item.dob), "dd/MM/yyyy") : "-/-/-"}
        </div>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center">
          <div className="2xl:max-w-[9rem]">{item.phoneNumber}</div>
        </div>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center">{item.gender}</div>
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
