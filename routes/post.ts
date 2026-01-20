import { apiPrivate } from "../lib/axios";
import { AxiosError } from "axios";
import { ModalCreatePostFormValues } from "../components/ModalCreatePost/ModalCreatePost";

export const createPost = async (values: ModalCreatePostFormValues) => {
  try {
    const response = await apiPrivate.post("/posts", {
      title: values.title,
      content: values.content,
      categoryId: values.category,
    });

    return response;
  } catch (error) {
    console.log(error);

    const e = error as AxiosError;

    throw e;
  }
};

export const getPosts = async () => {
  try {
    const response = await apiPrivate.get("/posts");

    return response;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    throw e;
  }
};
