<template>
  <div class="form-input-element">
    <ValidationMessage :validation="validation" :errors="errors" :localValue="localValue" />
    <label :for="name">{{ label }}</label>
    <input 
      class="field-input" 
      :type="type"
      :name="name" 
      :placeholder="placeholder" 
      v-model="localValue" 
      @input="handleInput"
    />
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ValidationMessage from '@/components/common/ValidationMessage.vue';

export default defineComponent({
  name: 'FormInput',
  components: {
    ValidationMessage
  },
  props: {
    type: {
      type: String,
      required: true
    },
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
    placeholder: {
      type: String,
      default: ''
    },
    validation: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const localValue = ref(props.value);

    const handleInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      localValue.value = input.value;
      emit('update:value', props.name, input.value);
    };

    watch(localValue, (newValue) => {
      if (props.type === 'number' || props.type === 'tel') {
        // Remove any non-numeric characters
        localValue.value = newValue.replace(/\D/g, '');
      }
    });
    return {
      handleInput,
      localValue
    };
  }
});

</script>

<style scoped lang="scss">

</style>
