import * as React from "react";
/**
 * A component loaded on first use that renders without suspending once its module
 * has loaded.
 *
 * `React.lazy` suspends the first render even when the module is already loaded, and
 * React 19 then waits up to 300 ms before showing the component. An overlay editor
 * opened by typing is missing for that long, so the next keys reach the grid and
 * restart the editor: typing "311" enters "11". Once `preload` has loaded the module,
 * this component hands React a thenable that resolves synchronously, which React
 * renders immediately.
 */
export function preloadableLazy(load) {
    let loaded;
    let loading;
    const preload = () => {
        if (loading === undefined) {
            loading = load().then(module => {
                loaded = module;
                return module;
            }, (error) => {
                // A failed preload must not stop the first render from loading again.
                loading = undefined;
                throw error;
            });
        }
        return loading;
    };
    const Component = React.lazy(() => {
        const module = loaded;
        if (module === undefined)
            return preload();
        // React reads a thenable that resolves synchronously as an already loaded module.
        // eslint-disable-next-line unicorn/no-thenable
        const resolved = { then: (resolve) => resolve(module) };
        return resolved;
    });
    return { Component, preload };
}
export const lazyDataGridOverlayEditor = preloadableLazy(async () => await import("./data-grid-overlay-editor.js"));
export const lazyNumberOverlayEditor = preloadableLazy(async () => await import("./private/number-overlay-editor.js"));
/** Start loading overlay editor chunks; safe to call multiple times. */
export function preloadOverlayEditors() {
    void lazyDataGridOverlayEditor.preload();
    void lazyNumberOverlayEditor.preload();
}
//# sourceMappingURL=preload-overlay-editors.js.map