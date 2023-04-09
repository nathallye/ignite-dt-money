import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProvideType {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export const TransactionsProvider = ({ children }: TransactionsProvideType) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async (query?: string) => {
    const response = await api.get("transactions", {
      params: {
        q: query
      }
    });

    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []); // como não foi informado uma DependencyList, esse useEffect será executado apenas uma única vez

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
