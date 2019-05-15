import { Injectable } from '@angular/core';
import { FormFieldFactory } from './form-field-factory.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Field } from './def/field';
import { isArray } from 'util';

@Injectable()
export class FormBuilderService {

    constructor(
        private formFieldFactory: FormFieldFactory,
        private fb: FormBuilder
    ) {}

    group(fieldsConfig: {
        [key: string]: any
    }, extra?: {
        [key: string]: any | null
    }): {fields: Field<any>[], formGroup: FormGroup, extendForm?: any} {
        const keys: string[] = Object.keys(fieldsConfig);
        if (!fieldsConfig || keys.length === 0) {
            return;
        }
        
        const formGroup: FormGroup = this.fb.group(fieldsConfig);
        const fields: Field<any>[] = keys.map(key => {
            const fieldConfig = fieldsConfig[key];
            if (!isArray(fieldConfig)) {
                console.warn('Need array');
                return ;
            }
            const [value, validators, asyncValidators, _fieldOptions] = [...fieldConfig];
            // let value = fieldConfig.length >= 1 ? fieldConfig[0] : undefined;
            // let fieldOptions = fieldConfig.length >= 4 ? fieldConfig[3] : {};
            const fieldOptions = _fieldOptions || {};
            fieldOptions['key'] = key;
            fieldOptions['value'] = value;
            fieldOptions['validators'] = validators;
            fieldOptions['asyncValidators'] = asyncValidators;
            fieldOptions['controlType'] = fieldOptions['controlType'] || 'text';

            fieldOptions['formGroup'] = formGroup;
            fieldOptions['formControl'] = formGroup.get(key);

            const _field = this.formFieldFactory.getField(fieldOptions);
            
            // 还原
            delete fieldOptions['formGroup'];
            delete fieldOptions['formControl'];

            return _field;
            // TODO: 配置项是 FormControl 对象或 FormGroup 对象等情况的处理，需要处理嵌套
        }).filter(it => !!it);

        return {fields, formGroup};
    }

    group2(fieldsConfig: Field<any>[], parentFormGroup?: FormGroup): {fields: Field<any>[], formGroup: FormGroup, extendForm?: any} {
        const formGroup: FormGroup = parentFormGroup || this.fb.group({});
        const _fields: Field<any>[] = [];
        fieldsConfig.forEach(fieldOptions => {
            // 处理嵌套，临时方案
            if (fieldOptions.fields && Array.isArray(fieldOptions.fields)) {
                const fg = new FormGroup({});
                formGroup.addControl(fieldOptions.key, fg);
                const {fields} = this.group2(fieldOptions.fields, fg);
                _fields.push(...fields);
            } else {
                const formControl = formGroup.addControl(fieldOptions.key, new FormControl(fieldOptions.value));
                fieldOptions['formGroup'] = formGroup;
                fieldOptions['formControl'] = formGroup.get(fieldOptions.key);
                const field = this.formFieldFactory.getField(fieldOptions);
                delete fieldOptions['formGroup'];
                delete fieldOptions['formControl'];
                _fields.push(field);
            }
        })
        _fields.filter(it => !!it);

        return {fields: _fields, formGroup};
    }
}