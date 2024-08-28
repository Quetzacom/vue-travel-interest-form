import { defineStore } from 'pinia';
import { loadFormConfig } from '@/services/formConfigService';

export const useFormStore = defineStore('form', {
  state: () => ({
    // TODO: Define state for form fields -- build this from the config.
    fieldValue: 'TEST1',
    config: null
  }),
  actions: {
    async initializeStore() {
      // Initialize the store with the form config.
      await this.loadConfig();
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