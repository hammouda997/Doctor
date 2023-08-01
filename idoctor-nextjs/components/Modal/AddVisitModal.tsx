import Field from "@/components/Field";
import Modal from "@/components/Modal";
import {IPatient, IPatientVisit} from "@/types/IPatient";
import React, {useEffect} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import ControlledDatePicker from "../Form/ControlledDatePicker";

type AddVisitModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  defaultValues?: Partial<IPatientVisit>;
  onSubmit: SubmitHandler<IPatientVisit>;
};
const AddVisitModal: React.FC<AddVisitModalProps> = ({
  visible,
  setVisible,
  defaultValues,
  onSubmit,
}) => {
  const formMethods = useForm<IPatientVisit>({defaultValues});

  useEffect(() => {
    if (defaultValues) {
      formMethods.reset(defaultValues);
    }
  }, [defaultValues, formMethods]);

  return (
    <div>
      <Modal
        title="Ajouter une visite"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <FormProvider {...formMethods}>
          <div className="justify-center items-center w-full">
            {defaultValues?.patient && (
              <div className="flex justify-between">
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">{"Patient: "}</span>
                  <span className="text-2xl font-bold text-gray-500">
                    {(defaultValues.patient as IPatient).fullName}
                  </span>
                </div>
              </div>
            )}
            <ControlledDatePicker
              id="startDate"
              showTimeSelect
              label="Date debut"
              name="startDate"
              validate={{required: "Ce champ est requis"}}
            />
            <ControlledDatePicker
              showTimeSelect
              id="endDate"
              label="Date Fin"
              name="endDate"
              validate={{required: "Ce champ est requis"}}
            />

            <button
              onClick={formMethods.handleSubmit(onSubmit)}
              className="mt-4 btn-purple btn-shadow w-full"
            >
              {"Créer"}
            </button>
          </div>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default AddVisitModal;
