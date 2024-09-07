import { createContext, useContext } from "react";

export function createSafeContext<T>(init?: T) {
  const Context = createContext(init);

  const useSafeContext = () => {
    const value = useContext(Context);

    if (!value) {
      throw new Error("useSafeContext must be used within a Provider");
    }

    return value;
  };

  return [useSafeContext, Context.Provider] as const;
}
