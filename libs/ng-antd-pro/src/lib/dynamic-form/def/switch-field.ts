import { Field } from './field';

export class SwitchField extends Field<string> {
    controlType = 'switch';
    type: string;
    
    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}