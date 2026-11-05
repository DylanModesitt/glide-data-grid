import * as React from "react";
interface ComponentModule<T> {
    readonly default: T;
}
/** A lazily loaded component and the function that starts loading it. */
export interface Preloadable<T extends React.ComponentType<any>> {
    readonly Component: React.LazyExoticComponent<T>;
    readonly preload: () => Promise<ComponentModule<T>>;
}
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
export declare function preloadableLazy<T extends React.ComponentType<any>>(load: () => Promise<ComponentModule<T>>): Preloadable<T>;
export declare const lazyDataGridOverlayEditor: Preloadable<typeof import("./data-grid-overlay-editor.js").default>;
export declare const lazyNumberOverlayEditor: Preloadable<typeof import("./private/number-overlay-editor.js").default>;
/** Start loading overlay editor chunks; safe to call multiple times. */
export declare function preloadOverlayEditors(): void;
export {};
