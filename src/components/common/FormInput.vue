<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input class="form-input" :name="name" :placeholder="placeholder" v-model="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'FormInput',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: null,
      //type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    watch(() => props.defaultValue, (newValue) => {
      // Emit the updated value to the parent component
      // This can be used to update the form store or any other state management

      
      console.log(`Updated value for ${props.name}: ${newValue}`);
    });
    return {
      value: props.value
    };
  }
});




</script>

<style scoped>


</style>