import ReactSelect, {
  GroupBase,
  StylesConfig,
  MultiValue,
  SingleValue,
} from "react-select";
import * as React from "react";
import {FieldError} from "react-hook-form";

export type ISelectorOption<T extends unknown = unknown> = {
  label: string;
  value: T;
};
export interface Props<T extends unknown> {
  id?: string;
  className?: string;
  items: ISelectorOption<T>[];
  multi?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  label?: string;
  onChange: (value?: T | T[]) => void;
  errors?: FieldError;
  isSearchBar?: boolean;
  value?: T | T[];
  isLanguageSelect?: boolean;

  selectStyle?:
    | StylesConfig<ISelectorOption<T>, boolean, GroupBase<ISelectorOption<T>>>
    | undefined;
}

const Select = <T extends unknown = unknown>({
  isSearchBar,
  id,
  items,
  multi = false,
  isClearable = false,
  isSearchable = false,
  label,
  onChange,
  errors,
  value,
  className,
  isLanguageSelect,
  selectStyle,
}: Props<T>) => {
  React.useEffect(() => {
    if (!multi && value instanceof Array) onChange(undefined);
    // eslint-disable-next-line
  }, [multi, value]);

  const selectedValue = React.useMemo(() => {
    if (!multi && isLanguageSelect)
      return items?.find((el) => el.value === value);
    if (!multi) return items?.find((el) => el.value === value);

    if (!(value instanceof Array))
      throw new Error("Value should be an array for multi = true");

    return items.filter((el) => value.includes(el.value));
  }, [multi, isLanguageSelect, items, value]);

  const handleChange = (
    event: MultiValue<ISelectorOption<T>> | SingleValue<ISelectorOption<T>>
  ) => {
    if (!multi) return onChange((event as ISelectorOption<T> | null)?.value);

    return onChange(
      (event as ISelectorOption<T>[] | null)?.map((el) => el.value) || []
    );
  };

  return (
    <div
      className={`${isSearchBar ? "my-0" : ""}  form-group ${className} ${
        errors ? "u-has-error" : ""
      }`}
    >
      {!isSearchBar && label && (
        <label className="form-label" htmlFor={id}>
          <span className="d-flex justify-content-between align-items-center ">
            {label}
          </span>
        </label>
      )}
      <ReactSelect
        isMulti={multi}
        options={items}
        isClearable={isClearable}
        isSearchable={isSearchable}
        styles={selectStyle}
        value={selectedValue}
        onChange={handleChange}
      />
      {errors && (
        <div className="invalid-feedback" style={{display: "block"}}>
          {errors.message}
        </div>
      )}
    </div>
  );
};

export default Select;
