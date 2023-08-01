/* eslint-disable no-useless-escape */
import {format, isAfter, isBefore, isDate, isEqual, isValid} from "date-fns";
import type {Message, ValidateResult, ValidationRule} from "react-hook-form";

export const messages = {
  numeric: "Doit être un nombre.",
  passwordConfirm: "Les mots de passe ne correspondent pas.",
  min: "Doit avoir une longueur minimale de caractères.",
  phone: "Numéro de téléphone invalide.",
  email: "Adresse e-mail invalide.",
  required: "Champ obligatoire.",
  url: "URL invalide.",
  strongPassword: "Le mot de passe doit être fort.",
  emailsList: "Veuillez entrer une liste d'adresses e-mail valides.",
  string: "Doit être une chaîne de caractères.",
  permissions: "Permissions insuffisantes.",
  captchaError: "Veuillez vérifier que vous n'êtes pas un robot.",
  integer: "Doit être un nombre entier.",
  max: "Doit avoir une longueur maximale de caractères.",
  minLength: "Doit avoir une longueur minimale de caractères.",
  maxLength: "Doit avoir une longueur maximale de caractères.",
  boolean: "Doit être un booléen.",
  date: "Doit être une date valide.",
};
export type IValidator =
  | "email"
  | "url"
  | "string"
  | "emailArray"
  | "minLength"
  | "numeric"
  | "phone"
  | "required"
  | "passwordConfirm"
  | "strongPassword";

const testRegex = (value: string, regex: RegExp) =>
  value === "" || (value && value.toString().match(regex) !== null);

export interface IValidatorParams {
  validation: IValidator;
  date?: Date;
  betweenParams?: number[];
  inStringArray?: string[];
  maxParams?: number;
  minParams?: number;
  passwordConfirm?: string;
}

const validatorsFunctions = () => ({
  numeric: (val: string) =>
    !val || testRegex(val, /^(\d+.?\d*)?$/) ? undefined : messages.numeric,
  phone: (val: string) =>
    testRegex(
      val,
      /^(((\+216){0,1}(\+ 216){0,1}(216){0,1}(00216){0,1}[.\- ]{0,1})([2345978]{1}[0-9]{1}[.\- ]{0,1})([0-9]{3}[.\- ]{0,1})([0-9]{3}))/g
    )
      ? undefined
      : messages.phone,
  minLength: (minParams: number) => (val?: string) => {
    if (!val) return undefined;
    return val.length >= minParams
      ? undefined
      : messages.min.replace(":min", minParams.toString());
  },
  email: (val?: string) => {
    if (!val) return undefined;
    return testRegex(
      val,
      /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    )
      ? undefined
      : messages.email;
  },
  emailArray: (valList: {id: string; text: string}[] | string) =>
    // eslint-disable-next-line no-nested-ternary
    Array.isArray(valList)
      ? valList?.find(
          (val) =>
            !testRegex(
              val.text,
              /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            )
        )
        ? messages.emailsList
        : undefined
      : validatorsFunctions().email(valList),
  required: (val: string | any[]) => {
    if (val instanceof Array)
      return val.length !== 0 ? undefined : messages.required;

    return val ? undefined : messages.required;
  },
  passwordConfirm: (passwordConfirm: string) => (val: string) =>
    val === passwordConfirm ? undefined : messages.passwordConfirm,
  url: (val?: string) => {
    if (!val) return undefined;
    return testRegex(
      val,
      /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i
    )
      ? undefined
      : messages.url;
  },
  strongPassword: (val: string) =>
    testRegex(
      val,
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/g
    )
      ? undefined
      : messages.strongPassword,
  string: (val: string) =>
    typeof val === typeof "string" ? undefined : messages.string,
});
type Validate = (data: any) => ValidateResult | Promise<ValidateResult>;
export type ValidationRules = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number>;
  minLength: ValidationRule<number>;
  pattern: ValidationRule<RegExp>;
  validate: Validate | Record<string, Validate>;
}>;
const Validators = (params: IValidatorParams[]): ValidationRules => {
  let validators: ValidationRules["validate"] = {};

  params.forEach((o) => {
    const {validation} = o;

    switch (validation) {
      case "minLength":
        if (o.minParams)
          validators = {
            ...validators,
            [validation]: validatorsFunctions()[validation](o.minParams),
          };
        break;
      case "passwordConfirm":
        if (o.passwordConfirm)
          validators = {
            ...validators,
            [validation]: validatorsFunctions()[validation](o.passwordConfirm),
          };
        break;
      default:
        validators = {
          ...validators,
          [validation]: validatorsFunctions()[validation],
        };
        break;
    }
  });

  return {validate: validators};
};

export default Validators;
