// import { setTransform } from '../drag-drop/utils';

export interface Position {
    top: number;
    left: number;
    width: number;
    height: number;
}

/**
 * Helper to convert a number to a percentage string.
 *
 * @ param  {Number} num Any number
 * @ return {String}     That number as a percentage.
 */
export function perc(num: number): string {
    return num * 100 + "%";
}

export function setTransform({ top, left, width, height }: Position): { [key: string]: string } {
    const translate = `translate(${left}px,${top}px)`;
    return {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute"
    };
}

export function setTopLeft({ top, left, width, height }: Position): { [key: string]: string } {
    return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute"
    };
}
