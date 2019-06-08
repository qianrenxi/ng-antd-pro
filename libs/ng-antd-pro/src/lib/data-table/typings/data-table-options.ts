/** Abstract Column Definition, can be a group or a column definition */
export interface AbstractColumnDef {
    /** The name to render in the column header */
    name: string;
    /** CSS class for the header */
    styleClass: string | string[] | Function;
    /** Expression or function to get the cells value */
    nameGetter: string | Function;
}

export interface ColumnDef extends AbstractColumnDef {
    id?: string;
    sort?: string;
    sortedAt?: number;
    sortingOrder?: string[] | null;
    field?: string;
    type?: string | string[];
    hide?: boolean;
    pinned?: boolean | string;

    valueGetter?: string | Function;
    valueSetter?: string | Function;

    width?: number;
    minWidth?: number;
    maxWidth?: number;
    autoHeight?: boolean;

    cellClass?: string | string[] | Function;
    cellRender?: { new (): any } | string; // TODO
}

export interface ColumnGroupDef extends AbstractColumnDef {
    id?: string;
    children: (ColumnDef | ColumnGroupDef)[];
    openByDefault?: boolean;
}


export interface DataTableOptions {
    columnsDefs: (ColumnDef | ColumnGroupDef)[];
}