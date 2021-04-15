import { createContext } from "react";

interface IProps {
  theme: string;
}

export const ThemeContext = createContext<IProps>({ theme: "xxx" });
