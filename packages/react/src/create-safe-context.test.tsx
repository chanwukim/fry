import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { createSafeContext } from "./create-safe-context";

describe("createSafeContext", () => {
  it("should create useSafeContext and Provider", () => {
    const initialValue = { foo: "bar" };
    const [useSafeContext, Provider] = createSafeContext(initialValue);

    expect(Provider).toBeDefined();
    expect(useSafeContext).toBeDefined();
  });

  it("should return the context value when used within provider", () => {
    const initialValue = { foo: "bar" };
    const [useSafeContext, Provider] = createSafeContext(initialValue);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider value={initialValue}>{children}</Provider>
    );

    const { result } = renderHook(() => useSafeContext(), { wrapper });

    expect(result.current).toEqual(initialValue);
  });

  it("should throw an error when used outside of provider", () => {
    const [useSafeContext] = createSafeContext<{ foo: string } | null>(null);

    expect(() => {
      renderHook(() => useSafeContext());
    }).toThrow("useSafeContext must be used within a Provider");
  });
});
