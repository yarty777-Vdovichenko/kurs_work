import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useRefresh from "./useRefresh";

describe("useRefresh", () => {
    it("починається зі значенням 0", () => {
        const { result } = renderHook(() => useRefresh());
        expect(result.current.refresh).toBe(0);
    });

    it("збільшує refresh на 1 при викликі triggerRefresh", () => {
        const { result } = renderHook(() => useRefresh());

        act(() => {
            result.current.triggerRefresh();
        });

        expect(result.current.refresh).toBe(1);
    });

    it("збільшує refresh кожного разу при повторних викликах", () => {
        const { result } = renderHook(() => useRefresh());

        act(() => { result.current.triggerRefresh(); });
        act(() => { result.current.triggerRefresh(); });
        act(() => { result.current.triggerRefresh(); });

        expect(result.current.refresh).toBe(3);
    });
});