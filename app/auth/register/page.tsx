"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { register } from "@/routes/auth";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().min(10, "Número deve ter pelo menos 10 dígitos"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function Page() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    try {
      const data = await register(values);
      console.log(data);

      if (data.status === 201) {
        toast.success("Usuário cadastrado com sucesso");
        form.reset();
        router.push("/auth/login");
      }
    } catch (error: unknown) {
      if ((error as AxiosError).status === 409) {
        toast.error("Email já cadastrado");
      }
    }
    // form.reset();
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white text-black rounded-xl shadow-lg border border-neutral-200">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
            <p className="mt-1 text-sm text-neutral-500">Acesse sua conta</p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nome
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        {...field}
                        placeholder="Digite seu nome"
                        className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                      />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        {...field}
                        placeholder="seu@email.com"
                        className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                      />
                      <FormMessage />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Telefone
                      </label>
                      <input
                        id="phone"
                        type="number"
                        required
                        {...field}
                        placeholder="Digite seu telefone"
                        className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                      />
                      <FormMessage />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Senha
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="***********"
                        required
                        {...field}
                        className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                      />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium"
                      >
                        Confirmar Senha
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="***********"
                        required
                        {...field}
                        className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                      />
                      <FormMessage />
                    </div>
                  )}
                />

                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50"
                >
                  Entrar
                </button>
              </form>
            </Form>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} Loot
        </div>
      </div>
    </div>
  );
}
