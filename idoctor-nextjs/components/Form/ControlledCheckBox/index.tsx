import Checkbox from "@/components/Checkbox";
import {ValidationRules} from "@/hooks/formValidator";
import * as React from "react";
import {useFormContext, Controller} from "react-hook-form";

interface IProps {
  name: string;
  validate?: ValidationRules;
  className?: string;
  label?: string;
}

const FormCheckBox: React.FC<IProps> = ({name, validate, ...checkBoxProps}) => {
  const {control} = useFormContext();

  return (
    <Controller
      rules={validate}
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <Checkbox
          name={name}
          {...checkBoxProps}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default FormCheckBox;
