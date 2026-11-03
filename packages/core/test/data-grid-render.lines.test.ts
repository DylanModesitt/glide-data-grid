import { expect, describe, it, vi } from "vitest";
import { drawExtraRowThemes, drawGridLines } from "../src/internal/data-grid/render/data-grid-render.lines.js";
import type { MappedGridColumn } from "../src/internal/data-grid/render/data-grid-lib.js";
import { getDataEditorTheme, mergeAndRealizeTheme } from "../src/common/styles.js";

const theme = mergeAndRealizeTheme(getDataEditorTheme());

function makeCtx() {
    return {
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
        rect: vi.fn(),
        fill: vi.fn(),
        save: vi.fn(),
        restore: vi.fn(),
        clip: vi.fn(),
        strokeStyle: "",
        fillStyle: "",
    };
}

function makeCol(sourceIndex: number, sticky: boolean): MappedGridColumn {
    return {
        title: `col ${sourceIndex}`,
        width: 100,
        sourceIndex,
        sticky,
        themeOverride: { bgCell: "#ff0000" },
    } as unknown as MappedGridColumn;
}

// One frozen column, then the grid scrolled so that column 3 is the first visible
// scrolling column. The effective columns are therefore [0, 3, 4, 5].
const scrolledCols = [makeCol(0, true), makeCol(3, false), makeCol(4, false), makeCol(5, false)];

describe("data-grid-render.lines", () => {
    it("drawGridLines asks verticalBorder about the column to the right of each line", () => {
        const ctx = makeCtx();
        const verticalBorder = vi.fn((col: number) => col !== 4);

        drawGridLines(
            ctx as unknown as CanvasRenderingContext2D,
            scrolledCols,
            0,
            0,
            0,
            500,
            200,
            undefined,
            undefined,
            0,
            0,
            () => 20,
            undefined,
            verticalBorder,
            0,
            0,
            theme,
            true
        );

        expect(verticalBorder.mock.calls.map(c => c[0])).toEqual([3, 4, 5, 6]);
        // The line between columns 3 and 4 is hidden; the one after the frozen column stays.
        expect(ctx.moveTo.mock.calls.map(c => c[0])).toEqual([100.5, 300.5, 400.5]);
    });

    it("drawExtraRowThemes asks verticalBorder about the column to the right of each column", () => {
        const ctx = makeCtx();
        const verticalBorder = vi.fn(() => true);

        drawExtraRowThemes(
            ctx as unknown as CanvasRenderingContext2D,
            scrolledCols,
            0,
            0,
            0,
            500,
            200,
            undefined,
            0,
            () => 20,
            undefined,
            verticalBorder,
            0,
            2,
            theme
        );

        expect(verticalBorder.mock.calls.map(c => c[0])).toEqual([3, 4, 5, 6]);
    });
});
