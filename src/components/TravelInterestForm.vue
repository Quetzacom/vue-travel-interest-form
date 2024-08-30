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
  <template v-if="!isSubmitted">
    <form @submit.prevent="handleSubmit">
        <component 
          v-for="field in formFields" 
          :is="getComponent(field.type)" 
          :type="field.type"
          :key="field.name"
          :name="field.name"
          :label="field.label"
          :placeholder="field.placeholder"
          :options="field.options"
          :validation="field.validation"
          :errors="field.errors"
          @update:value="updateFieldValue"
          
        /> 
        <!-- v-model="formData[field.name]" -->
      <button :disabled="!isReadyToSubmit" class="button" type="submit">{{ formConfig?.label || 'Submit' }}</button>
    </form>
  </template>
  <div v-if="isSubmitted">
    <h2>has been submitted successfully!</h2>
  </div>
  <div class="profile-card">
    <h3>Draft Profile Data</h3>
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
    const isReadyToSubmit =computed(() => formStore.isReadyToSubmit);
    const isSubmitted = computed(() => formStore.isSubmitted);
  


    const components = {
      FormTextArea: defineAsyncComponent(() => import('@/components/common/FormTextArea.vue')),
      FormInput: defineAsyncComponent(() => import('@/components/common/FormInput.vue')),
      FormInfo: defineAsyncComponent(() => import('@/components/common/FormInfo.vue')),
      FormSelect: defineAsyncComponent(() => import('@/components/common/FormSelect.vue')),
      FormCheckBoxes: defineAsyncComponent(() => import('@/components/common/FormCheckBoxes.vue')),
      /* ADD NEW FORM ELEMENT COMPONENT IMPORTS HERE */
    };

    const getComponent = (type: string) => {
      /* ADD TYPE TO COMPONENT MAPPING IN SWITCH STATEMENT */

      switch (type) {
        case 'text':
        case 'tel':
        case 'number':
          return components.FormInput;
        case 'textarea':
          return components.FormTextArea;
        case 'select':
          return components.FormSelect;
        case 'checkbox':
          return components.FormCheckBoxes;
        default:
        return components.FormInfo;
      }
    };

    const updateFieldValue = (name: string, value: any) => {
      //console.log(`Updating field ${name} with value: ${value}`);
      formStore.updateField(name, value);
    };

    const handleSubmit = () => {
      console.log('Form submitted');
      formStore.submitForm();
    };

    return {
      formConfig,
      formFields,
      formData,
      components,
      getComponent,
      updateFieldValue,
      isReadyToSubmit,
      handleSubmit,
      isSubmitted
    };
  },
});

</script>

<style lang="scss">

/* Reset list item styles */
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;

}

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

    > * {
      margin-bottom: 1rem;
    }

    > div {
      position: relative;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
    }

    .field-input, .field-textarea, .field-select {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      color: #666;
      background-color: #fff;

    }

    .form-textarea {
      resize: vertical;
    }

    .button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }

      &:disabled {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
      }
    }
  }
}

.warning {
  color: rgb(255, 98, 0);
  margin-top: 1rem;
}

</style>