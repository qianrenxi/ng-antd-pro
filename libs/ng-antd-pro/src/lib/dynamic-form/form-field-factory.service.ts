import { Injectable } from "@angular/core";
import { Field } from './def/field';
import { TextField } from "./def/text-field";
import { DropdownField } from "./def/dropdown-field";
import { SwitchField } from './def/switch-field';

@Injectable()
export class FormFieldFactory {

    getField(options = {
        controlType: 'text'
    }) {
        if (!options || !options['controlType']) {
            console.warn('Must provide field control type');
            return;
        }
        const controlType = options['controlType'];
        let field: Field<any> = null;
        switch(controlType) {
            case 'text': {
                field = this.getTextField(options);
                break;
            } 
            case 'dropdown': {
                field = this.getDropdownField(options);
                break;
            }
            case 'switch': {
                field = this.getSwitchField(options);
                break;
            }
            default: {
                console.warn(`No matched control type support for '${controlType}'`);
                return;
            }
        }
        return field;
    }

    getTextField(options = {}): TextField {
        return new TextField(options);
    }

    getDropdownField(options = {}): DropdownField {
        return new DropdownField(options);
    }

    getSwitchField(options = {}): SwitchField {
        return new SwitchField(options);
    }
}