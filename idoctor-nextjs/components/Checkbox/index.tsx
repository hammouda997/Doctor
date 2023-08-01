import Icon from "@/components/Icon";
import {useFormContext} from "react-hook-form";

type CheckboxProps = {
  className?: string;
  label?: string;
  value: any;
  onChange: any;
  name: string;
};

const Checkbox = ({className, label, value, onChange, name}: CheckboxProps) => {
  const {register} = useFormContext();

  return (
    <label
      className={`group relative inline-flex items-start select-none cursor-pointer tap-highlight-color ${className}`}
    >
      <input
        className="absolute top-0 left-0 opacity-0 invisible"
        type="checkbox"
        value={value}
        onChange={onChange}
        checked={value}
        ref={register(name) as any}
      />
      <span
        className={`relative flex justify-center items-center shrink-0 w-5 h-5 border transition-colors dark:border-white group-hover:border-green-1 ${
          value
            ? "bg-green-1 border-green-1 dark:!border-green-1"
            : "bg-transparent border-n-1 dark:border-white"
        }`}
      >
        <Icon
          className={`fill-white transition-opacity ${
            value ? "opacity-100" : "opacity-0"
          }`}
          name="check"
        />
      </span>
      {label && (
        <span className="ml-2.5 pt-0.75 text-xs font-bold text-n-1 dark:text-white">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
