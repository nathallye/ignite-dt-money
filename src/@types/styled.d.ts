import "styled-components";

import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme; // pegando o tipo que o TS já infere

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
};