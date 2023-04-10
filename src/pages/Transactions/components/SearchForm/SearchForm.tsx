import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { MagnifyingGlass } from "phosphor-react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { TransactionsContext } from "../../../../contexts/TransactionsContext";

import { SearchFormContainer } from "./styles";

const searchFormSchema = zod.object({
  query: zod.string(),
});

type SearchFormInputs = zod.infer<typeof searchFormSchema>;

export const SearchForm = () => {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const searchTransactionsHandler = async (data: SearchFormInputs) => {
    await fetchTransactions(data.query);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(searchTransactionsHandler)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
