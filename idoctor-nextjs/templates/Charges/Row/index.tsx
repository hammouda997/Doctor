import Link from "next/link";
import Icon from "@/components/Icon";
import {format} from "date-fns";
import {IMedicalCareListType} from "@/types/IMedicalCare";

type RowProps = {
  item: IMedicalCareListType;
  onEdit: (item: IMedicalCareListType) => void;
  onDelete: (item: IMedicalCareListType) => void;
};

const Row = ({item, onEdit}: RowProps) => {
  return (
    <tr className="">
      <td className="td-custom">
        <Link
          className="flex items-center text-sm font-bold transition-colors hover:text-purple-1"
          href={"/charges/" + item._id}
        >
          {item.patient.fullName}
        </Link>
      </td>
      <td className="td-custom font-medium">
        <div className="2xl:max-w-[9rem]">{item.doctor.fullName}</div>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center">
          <div className="2xl:max-w-[9rem]">{item.kine?.fullName || "-"}</div>
        </div>
      </td>
      <td className="td-custom font-medium">
        <div className="flex items-center">{item.visits?.length || 0}</div>
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
        {/* <button
          onClick={() => onDelete(item)}
          className="btn-stroke btn-small md:grow"
        >
          <Icon name="remove" />
        </button> */}
      </td>
    </tr>
  );
};

export default Row;
