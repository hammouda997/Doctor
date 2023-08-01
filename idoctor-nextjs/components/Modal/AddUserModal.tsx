import Field from "@/components/Field";
import Modal from "@/components/Modal";
import FormSelect from "@/components/Select/FormSelect";
import {IUser} from "@/types/User";
import React, {useEffect} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";

type AddUserModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  defaultValues?: IUser;
  onSubmit: SubmitHandler<IUser>;
};
const AddUserModal: React.FC<AddUserModalProps> = ({
  visible,
  setVisible,
  defaultValues,
  onSubmit,
}) => {
  const formMethods = useForm<IUser>({defaultValues});

  useEffect(() => {
    if (defaultValues) {
      formMethods.reset(defaultValues);
    }
  }, [defaultValues, formMethods]);

  return (
    <div>
      <Modal
        title="Créez un nouveau utilisateur"
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
            className="mb-6"
            label="Email"
            placeholder="Entrez l'email"
            type="email"
            name="email"
          />
          <FormSelect
            className="mb-6"
            label="Role"
            items={[
              {label: "DOCTOR", value: "DOCTOR"},
              {label: "PHYSTOTHERAPIST", value: "PHYSTOTHERAPIST"},
              {label: "SECRETARY", value: "SECRETARY"},
              {label: "ADMIN", value: "DOCTOR"},
            ]}
            name="role"
          />
          {!defaultValues && (
            <Field
              className="mb-4"
              label="Mot de passe"
              placeholder="mot de passe"
              name="password"
              type="password"
            />
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

export default AddUserModal;
