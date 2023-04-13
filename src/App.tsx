import { ThemeProvider } from "styled-components";

import { TransactionsProvider } from "./contexts/TransactionsContext";

import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

import { Transactions } from "./pages/Transactions";

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
};
