import { defineStore } from 'pinia';
import { loadFormConfig } from '@/services/formConfigService';

interface ValidationConfig {
  required: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}
interface FieldConfig {
  name: string;
  defaultValue: string | number | string[] | number[] | null;
  type: string;
  label: string;
  options?: string[];
  validation: ValidationConfig;
  placeholder?: string;
  errors?: Record<string, string>;
}

interface FormConfig {
  fields: FieldConfig[];
  submit: {
    label?: string;
    errors?: Record<string, string>;
  };
}

export const useFormStore = defineStore('form', {
  state: () => ({
    // TODO: Define state for form fields -- build this from the config.
    fieldValue: 'TEST1',
    config: null as FormConfig | null,
    fields: {} as Record<string, any>
  }),
  actions: {
    async initializeStore() {
      // Initialize the store with the form config.
      await this.loadConfig();
      if (this.config && this.config.fields) {
        this.config.fields.forEach((field: FieldConfig) => {
          //Declaring a new field in store based on config
          this.fields[field.name] = field.defaultValue;
        });
      }
      console.log("Fields: ", this.fields);
      console.log('Form Store is ready');
    },
    async loadConfig() {
      try {
        const config = await loadFormConfig();
        this.config = config;
        console.log('Config: ', config);
      } catch (error) {
        console.error('Failed to load form config:', error);
      }
    },
    updateValue(field: string, value: string) {
      //(this as any)[field] = value;
      console.log('updateValue', field, value);

      //set fieldValue state
      this.fieldValue = value;
      
    }
  }
});