import type {AxiosError} from "axios";
import {toast} from "react-toastify";

const isAxiosError = (
  error: AxiosError<{message: string}> | Error | unknown
): error is AxiosError => (error as AxiosError).isAxiosError === true;
export const errorHandler = (error: unknown) => {
  const typedError = error as AxiosError<{message: string}> | Error;
  toast(
    isAxiosError(typedError)
      ? // @ts-ignore
        typedError.response?.data?.message || typedError.message
      : typedError.message,
    {
      type: "error",
    }
  );
};
