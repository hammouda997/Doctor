import * as React from "react";
import {useFormContext, Controller} from "react-hook-form";
import Select, {Props as IComponentProps} from "components/Select";

interface IProps<T extends unknown>
  extends Omit<IComponentProps<T>, "errors" | "onChange" | "value"> {
  name: string;
}

const FormSelect = <T extends unknown>({name, ...selectProps}: IProps<T>) => {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <Select {...selectProps} id={name} value={value} onChange={onChange} />
      )}
    />
  );
};

export default FormSelect;
