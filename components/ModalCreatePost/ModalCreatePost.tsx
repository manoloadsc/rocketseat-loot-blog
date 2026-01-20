import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { GetCategories } from "../../routes/category";
import { CategoryType } from "../../routes/category";
import { createPost } from "@/routes/post";
import { toast } from "sonner";

type ModalCreatePostProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getPosts: () => void;
};

export type ModalCreatePostFormValues = {
  title: string;
  content: string;
  category: string;
};

const modalCreatePostSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  content: z
    .string()
    .min(1, "Conteúdo é obrigatório")
    .max(500, "Conteúdo deve ter no máximo 500 caracteres"),
  category: z.string().min(1, "Categoria é obrigatória"),
});

export default function ModalCreatePost({
  open,
  onOpenChange,
  getPosts,
}: ModalCreatePostProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await GetCategories();
      console.log(response.data);
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const form = useForm<ModalCreatePostFormValues>({
    resolver: zodResolver(modalCreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: ModalCreatePostFormValues) => {
    try {
      const response = await createPost(values);
      console.log(response);

      if (response.status === 201) {
        toast.success("Post criado com sucesso");
        form.reset();
        onOpenChange(false);
        getPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie seu post</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar seu post
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Título
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    {...field}
                    placeholder="Digite o título do seu post"
                    className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Conteúdo
                  </label>
                  <input
                    id="content"
                    type="text"
                    required
                    {...field}
                    placeholder="Digite o conteúdo do seu post"
                    className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Categoria
                  </label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className=" w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </div>
              )}
            />

            <Button type="submit">Criar post</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
