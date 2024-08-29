<!--
 TravelInterestForm.vue
 Form component that renders form fields based on the configuration from the form store.
 Form Element Components are dynamically loaded based on the type of the field

 Instructions for adding new form element types and components:
 * Add the component import to the components object.
 * Add the type to component mapping in the getComponent method switch statement.
 * formConfig.json - Config file sets data for form fields to be used. Config should use types available.
-->

<template>
<div class="travel-interest-form">
  <!-- Placeholder for form -->
  <h1>Travel Interest Form</h1>

  <form @submit.prevent="handleSubmit">
      <component 
        v-for="field in formFields" 
        :is="getComponent(field.type)" 
        :type="field.type"
        :key="field.name"
        :name="field.name"
        :label="field.label"
        :placeholder="field.placeholder"
        :default-value="field.defaultValue"
        @update:value="updateFieldValue"
        
      /> 
      <!-- v-model="formData[field.name]" -->
    <button type="submit">{{ formConfig?.label || 'Submit' }}</button>
  </form>
  
  <div class="profile-card">
    <ul>
      <li v-for="(value, key) in formData" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">

import { computed, defineComponent, ref, defineAsyncComponent } from 'vue';
import { useFormStore } from '@/stores/useFormStore';

export default defineComponent({
  name: 'TravelInterestForm',
  setup() {
    const formStore = useFormStore();
    const formConfig = computed(() => formStore.config?.submit);
    const formFields = computed(() => formStore.config?.fields);
    const formData = computed(() => formStore.formData);

    const components = {
      FormTextArea: defineAsyncComponent(() => import('@/components/common/FormTextArea.vue')),
      FormInput: defineAsyncComponent(() => import('@/components/common/FormInput.vue')),
      FormInfo: defineAsyncComponent(() => import('@/components/common/FormInfo.vue')),

      /* ADD NEW FORM ELEMENT COMPONENT IMPORTS HERE */
    };

    const getComponent = (type: string) => {
      /* ADD TYPE TO COMPONENT MAPPING IN SWITCH STATEMENT */

      switch (type) {
        case 'text':
          return components.FormInput;
        case 'textarea':
          return components.FormTextArea;
        default:
        return components.FormInfo;
      }
    };

    const updateFieldValue = (name: string, value: any) => {
      console.log(`Updating field ${name} with value: ${value}`);
      formStore.updateField(name, value);
    };

    const handleSubmit = () => {
      console.log('Form submitted');
      formStore.submitForm();
      if (formStore.isSubmitted) {
        // Handle form submission logic
      }
    };

    return {
      formConfig,
      formFields,
      formData,
      components,
      getComponent,
      updateFieldValue,
      handleSubmit
    };
  },
});

</script>

<style lang="scss">

.travel-interest-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;

  .profile-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
    min-width: 300px;
  }

  form {
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .field-input, .field-textarea {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;

  }

  .form-textarea {
    resize: vertical;
  }
}

</style>