import { Field } from './field';

export class TextField extends Field<string> {
    controlType = 'text';
    type: string;
    
    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}