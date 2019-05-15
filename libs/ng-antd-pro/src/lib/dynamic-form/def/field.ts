import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
export class Field<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    explain: {msgs: string[], errors: {[key: string]: string}};

    fields: Field<any>[];
    formGroup: FormGroup;
    formControl: AbstractControl;

    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        explain?: {msgs: string[], errors: {[key: string]: string}};
        fields?: Field<any>[];
        formGroup?: FormGroup;
        formControl?: AbstractControl;
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.explain = options.explain;
        this.fields = options.fields;
        this.formGroup = options.formGroup;
        this.formControl = options.formControl;
    }
}