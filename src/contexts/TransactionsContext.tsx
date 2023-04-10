import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";

import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProvideType {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export const TransactionsProvider = ({ children }: TransactionsProvideType) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => { // useCallback - evita que a função seja recriada em memória se nenhuma informação que ela dependa tenha mudado
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt", // ordena por dada
        _order: "desc", // na ordem decrescente
        q: query
      },
    });

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback( // useCallback - evita que a função seja recriada em memória se nenhuma informação que ela dependa tenha mudado
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;

      const response = await api.post("transactions", {
        description,
        price,
        category,
        type,
        createdAt: new Date() // precisa enviar só porque o json server não consegue criar sozinho
      });

      setTransactions((state) => [response.data, ...state]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, []); // como não foi informado uma DependencyList, esse useEffect será executado apenas uma única vez

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
