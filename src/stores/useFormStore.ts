import { defineStore } from 'pinia';
import { loadFormConfig } from '@/services/formConfigService';

export const useFormStore = defineStore('form', {
  state: () => ({
    // TODO: Define state for form fields -- build this from the config.
    fieldValue: 'TEST1'
  }),
  actions: {
    
    updateValue(field: string, value: string) {
      //(this as any)[field] = value;
      console.log('updateValue', field, value);
      //this.fieldValue = value;
      //set fieldValue state
      this.fieldValue = value;
      
    }
  },
});