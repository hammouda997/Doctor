import {useState} from "react";
import {twMerge} from "tailwind-merge";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import {useFormContext} from "react-hook-form";
import {ValidationRules} from "@/hooks/formValidator";

type FieldProps = {
  className?: string;
  classInput?: string;
  label?: string;
  textarea?: boolean;
  type?: string;
  value?: string;
  onChange?: any;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  image?: string;
  currency?: string;
  name?: string;
  validate?: ValidationRules;
};

const Field = ({
  className,
  classInput,
  label,
  textarea,
  type,
  value,
  onChange,
  placeholder,
  required,
  icon,
  image,
  currency,
  name = "name",
  validate,
}: FieldProps) => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const formContext = useFormContext();

  const success = false;
  const error = false;

  return (
    <div className={`${className}`}>
      <div className="">
        {label && <div className="mb-3 text-xs font-bold">{label}</div>}
        <div className="relative">
          {textarea ? (
            <textarea
              {...formContext?.register(name, validate)}
              className={twMerge(
                `w-full h-24 px-5 py-3 bg-white border border-n-1 rounded-sm text-sm text-n-1 font-bold outline-none resize-none transition-colors placeholder:text-n-3 focus:border-purple-1 dark:bg-n-1 dark:border-white dark:text-white dark:focus:border-purple-1 dark:placeholder:text-white/75 ${
                  icon ? "pr-15" : ""
                } ${success ? "pr-15 !border-green-1" : ""} ${
                  error ? "pr-15 !border-pink-1" : ""
                } ${image || currency ? "pr-15" : ""} ${classInput}`
              )}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
            ></textarea>
          ) : (
            <input
              {...formContext?.register(name, validate)}
              className={twMerge(
                `w-full h-13 px-5 bg-white border border-n-1 rounded-sm text-sm text-n-1 font-bold outline-none transition-colors placeholder:text-n-3 focus:border-purple-1 dark:bg-n-1 dark:border-white dark:text-white dark:focus:border-purple-1 dark:placeholder:text-white/75 ${
                  icon || type === "password" ? "pr-15" : ""
                } ${success ? "pr-15 !border-green-1" : ""} ${
                  error ? "pr-15 !border-pink-1" : ""
                } ${image || currency ? "pr-15" : ""} ${classInput}`
              )}
              type={
                (type === "password" &&
                  (visiblePassword ? "text" : "password")) ||
                type ||
                "text"
              }
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
            />
          )}
          {icon && type !== "password" && !success && !error && (
            <Icon
              className="absolute top-1/2 right-5 -translate-y-1/2 icon-20 fill-n-1 pointer-events-none dark:fill-white"
              name={icon}
            />
          )}
          {type === "password" && !success && !error && (
            <button
              className="group absolute top-0 right-0 bottom-0 w-15 outline-none"
              type="button"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              <Icon
                className="icon-20 fill-n-2 transition-colors group-hover:fill-n-1 dark:fill-white/75 dark:group-hover:fill-white"
                name={visiblePassword ? "eye" : "eye-slash"}
              />
            </button>
          )}
          {(success || error) && (
            <Icon
              className={`absolute top-1/2 right-5 icon-20 -translate-y-1/2 pointer-events-none ${
                success ? "fill-green-1" : "fill-pink-1"
              }`}
              name={success ? "check-circle" : "info-circle"}
            />
          )}
          {image && (
            <div className="absolute top-1/2 right-5 w-5 p-0.25 -translate-y-1/2 text-0 dark:bg-white">
              <Image
                className="w-full"
                src={image}
                width={20}
                height={20}
                alt=""
              />
            </div>
          )}
          {currency && (
            <div className="absolute top-1/2 right-5 -translate-y-1/2 text-sm font-medium">
              {currency}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Field;
