import { api } from "@/lib/axios";
import { RegisterSchemaType } from "../app/auth/register/page";
import { LoginSchemaType } from "../app/auth/login/page";
import { AxiosError } from "axios";

export const register = async (values: RegisterSchemaType) => {
  try {
    console.log(values);
    const response = await api.post("/account", {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    });

    return response;
  } catch (error) {
    console.log(error);

    const e = error as AxiosError;

    throw e;
  }
};

export const login = async (values: LoginSchemaType) => {
  try {
    console.log(values);
    const response = await api.post("/sessions", {
      email: values.email,
      password: values.password,
    });

    return response;
  } catch (error) {
    console.log((error as AxiosError).status);

    const e = error as AxiosError;

    throw e;
  }
};
