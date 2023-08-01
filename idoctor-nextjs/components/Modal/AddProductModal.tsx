import Field from "@/components/Field";
import Modal from "@/components/Modal";
import {IProduct} from "@/types/IProduct";
import React, {useEffect} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";

type AddProductProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  defaultValues?: IProduct;
  onSubmit: SubmitHandler<IProduct>;
};

const AddProductModal: React.FC<AddProductProps> = ({
  defaultValues,
  onSubmit,
  visible,
  setVisible,
}) => {
  const formMethods = useForm<IProduct>();

  useEffect(() => {
    if (defaultValues) {
      formMethods.reset(defaultValues);
    }
  }, [defaultValues, formMethods]);

  return (
    <div>
      <Modal
        title="Créez un produit"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <FormProvider {...formMethods}>
          <Field
            className="mb-4"
            label="Nom"
            placeholder="Entrez le nom"
            name="name"
          />
          <Field
            className="mb-6"
            label="Quantité"
            placeholder="Entrez la quantité"
            name="stock"
          />
          <Field
            className="mb-6"
            label="Quantité  alerte"
            placeholder="Entrez la quantité alerte"
            name="stockAlert"
          />
          <Field
            className="mb-4"
            label="Marque"
            placeholder="Entrez la marque"
            name="brand"
          />
          <Field
            className="mb-6"
            label="Description"
            textarea
            name="description"
          />

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

export default AddProductModal;
