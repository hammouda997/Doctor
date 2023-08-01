import type {Dispatch, SetStateAction} from "react";
import {createContext, useContext} from "react";

type AppContextParams = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setInitiated: Dispatch<SetStateAction<boolean>>;
};
export const AppContext = createContext<AppContextParams>({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  setInitiated: () => null,
});

export function useAppContext() {
  return useContext(AppContext);
}
