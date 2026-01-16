import { AxiosError } from "axios";
import { apiPrivate } from "../lib/axios";

export type CategoryType = {
  id: string;
  name: string;
};

export const GetCategories = async () => {
  try {
    const response = await apiPrivate.get("/categories");
    return response;
  } catch (error) {
    const e = error as AxiosError;

    throw e;
  }
};
