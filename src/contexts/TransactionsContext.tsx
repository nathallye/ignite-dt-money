import { ReactNode, createContext, useEffect, useState } from "react";

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
    const url = new URL("http://localhost:3333/transactions");

    if (query) {
      url.searchParams.append("q", query);
    }

    const response = await fetch(url);
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []); // como não foi informado uma DependencyList, esse useEffect será executado apenas uma única vez

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
