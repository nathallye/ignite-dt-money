import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { TransactionsContext } from "../../contexts/TransactionsContext";

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"])
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
  const { createTransaction } = useContext(TransactionsContext);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income"
    }
  });

const createNewTransactionHandler = async (data: NewTransactionFormInputs) => {
  const { description, price, category, type } = data;

  await createTransaction({
    description,
    price,
    category,
    type
  });

  reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X />
        </CloseButton>

        <form onSubmit={handleSubmit(createNewTransactionHandler)}>
          <input 
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input 
            type="number" 
            placeholder="Preço" 
            required
            {...register("price", { valueAsNumber: true })} 
          />
          <input 
            type="text" 
            placeholder="Categoria" 
            required 
            {...register("category")}
          />

          <Controller 
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType 
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
