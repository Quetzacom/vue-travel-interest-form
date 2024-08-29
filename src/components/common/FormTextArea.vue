<template>
  <div class="form-textarea-element">
    <label :for="name">{{ label }}</label>
    <textarea 
      class="field-textarea" 
      :name="name" 
      :placeholder="placeholder" 
      v-model="localValue"
      @input="handleInput"
    >
    </textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'FormTextArea',
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
      const input = event.target as HTMLTextAreaElement;
      localValue.value = input.value;
      emit('update:value', props.name, input.value);
    };

    watch(localValue, (newValue) => {
      //emit('update:value', newValue);
      console.log(`Updated value for ${props.name}: ${newValue}`);
      console.log(`props.value: ${props.value}`);
    });

    return {
      handleInput,
      localValue
    };
  }
});
</script>