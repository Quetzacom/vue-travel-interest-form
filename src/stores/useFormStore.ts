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
  defaultValue: any;
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
    name: 'useFormStore',
    config: null as FormConfig | null,
    formData: {} as Record<string, any>,
    validationErrors: {} as Record<string, string[]>,
    isReadyToSubmit: false,
    isSubmitted: false
  }),
  actions: {
    async initializeStore() {
      // Initialize the store with the form config.
      await this.loadConfig();
      if (this.config && this.config.fields) {
        this.config.fields.forEach((field: FieldConfig) => {
          //Declaring a new field in store based on config
          //console.log('Field: ', field);
          this.formData[field.name] = field.defaultValue;

        });
        this.isReadyToSubmit = false; //Form is not ready to submit on start
        this.validateAllFields();

        console.log('%cForm Store is ready', "background-color: green; color: white;");
      } else {
        console.error('Failed to initialize form store');
        //try one more time in 5 seconds
        setTimeout(() => {
          this.initializeStore();
        }, 5000);
      }
      
    },
    async loadConfig() {
      this.config = await loadFormConfig();
    },
    updateField(field: string, value: any) {
      //console.log(`${this.name} is updating field ${field} with value: ${value}`);
      this.formData[field] = value;
      this.validateField(field);
      this.checkIfFormIsReady();
    },

    validateField(field: string) {
      //console.log(`${this.name} is validating field ${field}`);
      const value = this.formData[field];
      const fieldConfig = this.config?.fields.find((f) => f.name === field);
      if (!fieldConfig) {
        console.error(`Field config not found for ${field}`);
        return;
      }
      const validation = fieldConfig.validation;
      const errors: string[] = [];
      if (validation.required && (value.toString().trim().length === 0)) {
        errors.push('Required');
      }
      if (validation.minLength && value && value.length < validation.minLength) {
        errors.push('MinLength');
      }
      if (validation.maxLength && value && value.length > validation.maxLength) {
        errors.push('MaxLength');
      }

      if (errors.length > 0) {
        this.setValidationError(field, errors.join(','));
      } else {
        this.clearValidationError(field);
      }
    },

    validateAllFields() {
      if (this.config && this.config.fields) {
        this.config.fields.forEach((field: FieldConfig) => {
          this.validateField(field.name);
        });
      }
      this.checkIfFormIsReady();
    },

    setValidationError(field: string, error: any) {
      //console.log(`${this.name} is setting validation error for ${field}: ${error}`);
      this.validationErrors[field] = [...(this.validationErrors[field] || []), error];
      this.isReadyToSubmit = false;
    },

    clearValidationError(field: string) {
      //console.log(`${this.name} is clearing validation error for ${field}`);
      delete this.validationErrors[field];
    },

    clearValidationErrors() {
      this.validationErrors = {};
      this.isReadyToSubmit = true;
    },

    checkIfFormIsReady() {
      this.isReadyToSubmit = Object.keys(this.validationErrors).length === 0;
    },

    submitForm() {
      //Mock Submit
      console.log(`${this.name} is submitting form`);
      console.log('Form Data: ', this.formData);
      if (!this.isReadyToSubmit) {
        console.error('Form is not ready to submit');
        return;
      }
      //Set the submitted flag
      this.isSubmitted = true;
 
    }
  }
});