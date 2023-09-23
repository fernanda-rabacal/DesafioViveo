import z from 'zod'

export const registerFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Digite pelo menos três letras."}),
    email: z
      .string()
      .min(1, { message: "Este campo é obrigatório" })
      .email("Informe um email válido."),
    phone: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    cpf: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    cep: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    street: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    number: z
      .number()
      .min(1, { message: "Este campo é obrigatório" }),
    neighbour: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    city: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    uf: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    password: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    confirm_password: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    complement: z.nullable(z.string()),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Senhas não conferem.",
    path: ["confirm"],
  });


 export const loginFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Email é obrigatório" }),
    password: z
        .string()
        .min(1, { message: "Senha é obrigatória" }),
    keep_connected: z
        .string()
        .transform(val => val === "yes" ? true : false)
  })
  
 export type LoginFormData = z.infer<typeof loginFormSchema>

 export type RegisterFormData = z.infer<typeof registerFormSchema>