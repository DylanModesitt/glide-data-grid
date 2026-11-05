/* eslint-disable react/display-name */
import * as React from "react";
import { drawTextCell, prepTextCell, measureTextCached } from "../internal/data-grid/render/data-grid-lib.js";
import { GridCellKind, type NumberCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";
import { drawEditHoverIndicator } from "../internal/data-grid/render/draw-edit-hover-indicator.js";
import { lazyNumberOverlayEditor } from "../internal/data-grid-overlay-editor/preload-overlay-editors.js";

const NumberOverlayEditor = lazyNumberOverlayEditor.Component;

export const numberCellRenderer: InternalCellRenderer<NumberCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Number,
    needsHover: cell => cell.hoverEffect === true,
    needsHoverPosition: false,
    useLabel: true,
    drawPrep: prepTextCell,
    draw: a => {
        const { hoverAmount, cell, ctx, theme, rect, overrideCursor } = a;
        const { hoverEffect, displayData, hoverEffectTheme } = cell;

        if (hoverEffect === true && hoverAmount > 0) {
            drawEditHoverIndicator(ctx, theme, hoverEffectTheme, displayData, rect, hoverAmount, overrideCursor);
        }
        drawTextCell(a, a.cell.displayData, a.cell.contentAlign);
    },
    measure: (ctx, cell, theme) =>
        measureTextCached(cell.displayData, ctx, theme.baseFontFull).width + theme.cellHorizontalPadding * 2,
    onDelete: c => ({
        ...c,
        data: undefined,
    }),
    provideEditor: () => p => {
        const { isHighlighted, onChange, value, validatedSelection, initialValue } = p;
        return (
            <React.Suspense fallback={null}>
                <NumberOverlayEditor
                    highlight={isHighlighted}
                    disabled={value.readonly === true}
                    value={value.data}
                    initialValue={initialValue}
                    validatedSelection={validatedSelection}
                    onChange={newNum => {
                        onChange({
                            ...value,
                            data: newNum,
                        });
                    }}
                />
            </React.Suspense>
        );
    },
    onPaste: (toPaste, cell, details) => {
        const newNumber =
            typeof details.rawValue === "number"
                ? details.rawValue
                : Number.parseFloat(typeof details.rawValue === "string" ? details.rawValue : toPaste);
        if (Number.isNaN(newNumber) || cell.data === newNumber) return undefined;
        return { ...cell, data: newNumber, displayData: details.formattedString ?? cell.displayData };
    },
};
