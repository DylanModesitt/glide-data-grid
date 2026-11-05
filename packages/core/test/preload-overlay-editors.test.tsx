import * as React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { preloadableLazy } from "../src/internal/data-grid-overlay-editor/preload-overlay-editors.js";

const Editor: React.FC = () => <div>editor</div>;

function renderInSuspense(Component: React.ComponentType) {
    return render(
        <React.Suspense fallback={<div>loading</div>}>
            <Component />
        </React.Suspense>
    );
}

describe("preloadableLazy", () => {
    afterEach(() => {
        cleanup();
    });

    test("renders without suspending once preloaded", async () => {
        const lazy = preloadableLazy(async () => ({ default: Editor }));
        await lazy.preload();

        renderInSuspense(lazy.Component);

        expect(screen.queryByText("editor")).not.toBeNull();
        expect(screen.queryByText("loading")).toBeNull();
    });

    test("suspends until loaded when not preloaded", async () => {
        const lazy = preloadableLazy(async () => ({ default: Editor }));

        renderInSuspense(lazy.Component);

        expect(screen.queryByText("loading")).not.toBeNull();
        expect(await screen.findByText("editor")).not.toBeNull();
    });

    test("loads the module once", async () => {
        const load = vi.fn(async () => ({ default: Editor }));
        const lazy = preloadableLazy(load);

        await Promise.all([lazy.preload(), lazy.preload()]);
        renderInSuspense(lazy.Component);

        expect(load).toHaveBeenCalledTimes(1);
    });

    test("loads again on first render after a failed preload", async () => {
        const load = vi
            .fn<() => Promise<{ default: React.FC }>>()
            .mockRejectedValueOnce(new Error("offline"))
            .mockResolvedValue({ default: Editor });
        const lazy = preloadableLazy(load);

        await expect(lazy.preload()).rejects.toThrow("offline");
        renderInSuspense(lazy.Component);

        expect(await screen.findByText("editor")).not.toBeNull();
        expect(load).toHaveBeenCalledTimes(2);
    });
});
