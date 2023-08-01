import {IPatientVisit} from "@/types/IPatient";
import {format} from "date-fns";
import React from "react";
import Icon from "./Icon";

type ChargesTableProps = {
  visits: IPatientVisit[];
  onRemove: (id: string) => void;
};

const ChargesTable: React.FC<ChargesTableProps> = ({visits, onRemove}) => (
  <div className="">
    <table className="table-custom -mt-0.25 border-none">
      <thead className="bg-gray-100">
        <tr>
          <th className="th-custom font-bold">N°</th>
          <th className="th-custom">Début</th>
          <th className="th-custom">Fin</th>
          <th className="th-custom"></th>
        </tr>
      </thead>

      <tbody>
        {visits?.map((item) => (
          <tr className="" key={item._id}>
            <td className="td-custom font-bold">#{item.visitId}</td>
            <td className="td-custom">
              <div className="inline-flex items-center text-sm font-bold">
                {item.startDate &&
                  format(new Date(item.startDate), "dd/MM/yyyy HH:mm")}
              </div>
            </td>
            <td className="td-custom font-medium">
              <div className="inline-flex items-center text-sm font-bold">
                {item.endDate &&
                  format(new Date(item.endDate), "dd/MM/yyyy HH:mm")}
              </div>
            </td>
            <td className="td-custom font-medium">
              <button
                onClick={() => onRemove(item._id)}
                className="btn-stroke btn-small"
              >
                <Icon name="remove" className="w-5 h-5 text-gray-500" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ChargesTable;
