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
    name: 'useFormStore',
    config: null as FormConfig | null,
    formData: {} as Record<string, any>,
    //string | number | string[] | number[] | null
    validationErrors: {} as Record<string, string[]>,
    isSubmitted: false
  }),
  actions: {
    async initializeStore() {
      // Initialize the store with the form config.
      await this.loadConfig();
      if (this.config && this.config.fields) {
        this.config.fields.forEach((field: FieldConfig) => {
          //Declaring a new field in store based on config
          console.log('Field: ', field);
          this.formData[field.name] = field.defaultValue;

        });
        console.log("Fields: ", this.formData);
        console.log('Form Store is ready');
      } else {
        console.error('Failed to initialize form store');
        //try one more time in 5 seconds
        setTimeout(() => {
          this.initializeStore();
        }, 5000);
      }
      
    },
    async loadConfig() {
      try {
        this.config = await loadFormConfig();
        console.log('Config: ', this.config);
      } catch (error) {
        this.config = null;
        console.error('Failed to load form config:', error);
      }
    },
    updateField(field: string, value: any) {
      console.log(`${this.name} is updating field ${field} with value: ${value}`);
      this.formData[field] = value;
    },
    setValidationError(field: string, error: any) {
      console.log(`${this.name} is setting validation error for ${field}: ${error}`);
      this.validationErrors[field] = [...this.validationErrors[field], error];

      //this.validationErrors[field].push(error);
    },
    clearValidationErrors() {
      console.log(`${this.name} is clearing validation errors`);
      this.validationErrors = {};
    },
    submitForm() {
      console.log(`${this.name} is submitting form`);
      //Write code to submit form data saving to the formData
      console.log('Form Data: ', this.formData);

      //Reset the form
      //this.formData = {};

      //Set the submitted flag
      this.isSubmitted = true;

      //Clear the validation errors
      this.clearValidationErrors();
    }
  }
});