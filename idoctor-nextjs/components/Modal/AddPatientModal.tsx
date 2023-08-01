import Field from "@/components/Field";
import ControlledDatePicker from "@/components/Form/ControlledDatePicker";
import Modal from "@/components/Modal";
import FormSelect from "@/components/Select/FormSelect";
import Switch from "@/components/Switch";
import {IPatient} from "@/types/IPatient";
import React, {useEffect} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";

type AddPatientModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  defaultValues?: IPatient;
  onSubmit: SubmitHandler<IPatient>;
};
const AddPatientModal: React.FC<AddPatientModalProps> = ({
  visible,
  setVisible,
  defaultValues,
  onSubmit,
}) => {
  const formMethods = useForm<IPatient>({defaultValues});
  const [isSocialAssurance, setIsSocialAssurance] =
    React.useState<boolean>(false);

  useEffect(() => {
    if (defaultValues) {
      formMethods.reset(defaultValues);
    }
  }, [defaultValues, formMethods]);

  return (
    <div>
      <Modal
        title="Créez un nouveau patient"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <FormProvider {...formMethods}>
          <Field
            className="mb-4"
            label="Nom complet"
            placeholder="Entrez le nom complet"
            name="fullName"
          />
          <Field
            className="mb-4"
            label="Numéro de téléphone"
            placeholder="Entrez le numéro de téléphone"
            type="tel"
            name="phoneNumber"
          />
          <Field
            className="mb-6"
            label="Email"
            placeholder="Entrez l'email"
            type="email"
            name="email"
          />
          <ControlledDatePicker name="dob" label="Date naissance" />
          <FormSelect
            className="mb-6"
            label="Genre"
            items={[
              {label: "Homme", value: "MALE"},
              {label: "Femme", value: "FEMALE"},
            ]}
            name="gender"
          />
          <Field
            className="mb-4"
            label="Poste"
            placeholder="Entrez le poste"
            name="job"
          />
          <Field className="mb-6" label="Notes" textarea name="notes" />
          <div className="mb-4">
            Assurance sociale{" "}
            <Switch
              value={isSocialAssurance}
              setValue={() => setIsSocialAssurance(!isSocialAssurance)}
            />
          </div>
          {isSocialAssurance && (
            <div>
              <FormSelect
                className="mb-6"
                label="Type d'assurance sociale"
                items={[
                  {label: "CNSS", value: "CNSS"},
                  {label: "CNOPS", value: "CNOPS"},
                  {label: "CNRA", value: "CNRA"},
                  {label: "CNAM", value: "CNAM"},
                  {label: "Autre", value: "Autre"},
                ]}
                name="socialAssuranceType"
              />
              <Field
                className="mb-6"
                label="Numéro d'assurance"
                name="assuranceNumber"
              />
              <Field
                className="mb-6"
                label="Clé d'assurance"
                name="assuranceKey"
              />
            </div>
          )}
          <button
            onClick={formMethods.handleSubmit(onSubmit)}
            className="btn-purple btn-shadow w-full"
          >
            {"Créer"}
          </button>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default AddPatientModal;
