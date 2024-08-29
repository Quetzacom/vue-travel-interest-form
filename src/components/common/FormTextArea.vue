<template>
  <div>
    <label :for="name">{{ label }}</label>
    <textarea class="form-textarea" :name="name" :placeholder="placeholder" v-model="localValue"></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'FormTextArea',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    defaultValue: {
      type: String,
      default: ''
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
    const localValue = ref(props.defaultValue);

    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      localValue.value = target.value;
      emit('update:value', props.name, localValue.value);
    };

    watch(localValue, (newValue) => {
      //emit('update:value', newValue);
      console.log(`Updated value for ${props.name}: ${newValue}`);
      console.log(`props.value: ${props.value}`);
    });

    return {
      localValue
    };
  }
});
</script>

<style scoped>

</style>