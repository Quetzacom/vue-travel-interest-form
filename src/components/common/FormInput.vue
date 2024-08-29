<template>
  <div class="form-input-element">
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

export default defineComponent({
  name: 'FormInput',
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
    }
  },
  setup(props, { emit }) {
    const localValue = ref(props.value);

    const handleInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      localValue.value = input.value;
      emit('update:value', props.name, input.value);
    };

    /* watch(() => props.defaultValue, (newValue) => {
      value.value = newValue;
      emit('update:value', props.name, newValue);
      console.log(`Updated value for ${props.name}: ${newValue}`);
    }); */
    return {
      handleInput,
      localValue
    };
  }
});

</script>