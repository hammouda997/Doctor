import {api, resetAuthToken} from "@/api/index";
import {errorHandler} from "@/hooks/errorHandler";
import {IUser} from "@/types/User";
export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post<{accessToken: string}>("/user/login", {
      email,
      password,
    });
    if (!res.data.accessToken) throw new Error("No token");

    localStorage.setItem("token", res.data.accessToken);
    resetAuthToken(res.data.accessToken);
    return res.data;
  } catch (error) {
    errorHandler(error);
  }
};
export const signUp = async (values: {email: string; password: string}) => {
  try {
    const response = await api.post<IUser>("/user/signup", values);
    const user = response.data;

    return user;
  } catch (error) {
    errorHandler(error);
  }
};
