<template>
  <div class="form-info-element">
    <p class="warning">DEV WARNING: A component was expected but not found for "{{ name }}" of type "{{ type }}"</p>
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
    return {
      handleInput,
      localValue
    };
  }
});

</script>

<style lang="scss" scoped>
  :host {
    display: block;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
  }
</style>