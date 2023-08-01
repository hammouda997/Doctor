import {Controller, get, useFormContext} from "react-hook-form";
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import {ValidationRules} from "@/hooks/formValidator";

interface IProps extends Omit<ReactDatePickerProps, "onChange"> {
  name: string;
  validate?: ValidationRules;
  className?: string;
  label?: string;
}
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);
const ControlledDatePicker: React.FC<IProps> = ({
  name,
  validate,
  className,
  label,
  ...props
}) => {
  const formContext = useFormContext();
  const {control} = formContext;
  const fieldError = get(formContext?.formState.errors, name);

  return (
    <>
      <Controller
        rules={validate}
        name={name}
        control={control}
        render={({field: {onChange, value}}) => (
          <div>
            {label && <div className="my-3 text-xs font-bold">{label}</div>}
            <div className="relative">
              <ReactDatePicker
                placeholderText="e.g. 25/12/2022"
                className="w-full h-13 px-5 bg-white border border-n-1 rounded-sm text-sm text-n-1 font-bold outline-none transition-colors placeholder:text-n-3 focus:border-purple-1 dark:bg-n-1 dark:border-white dark:text-white dark:focus:border-purple-1 dark:placeholder:text-white/75"
                selected={value ? new Date(value) : null}
                locale={"fr"}
                title={label}
                dateFormat={props.showTimeSelect ? "Pp" : "dd/MM/yyyy HH:mm"}
                {...props}
                onChange={(date: Date) => onChange(date)}
              />
            </div>
          </div>
        )}
      />
      {fieldError && (
        <div className="font-bold text-red-500">{fieldError.message}</div>
      )}
    </>
  );
};

export default ControlledDatePicker;
