<template>
  <div class="form-textarea-element">
    <ValidationMessage :validation="validation" :errors="errors" :localValue="localValue" />
    <label :for="name">{{ label }}</label>
    <textarea 
      class="field-textarea" 
      :name="name" 
      :placeholder="placeholder" 
      v-model="localValue"
      @input="handleInput"
    >
    </textarea>
    <div class="status-message">
      <span v-if="maxLength > 0">Remaining Characters: {{ remainingCharacters }} / </span>
       {{ validation.maxLength }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import ValidationMessage from '@/components/common/ValidationMessage.vue';

export default defineComponent({
  name: 'FormTextArea',
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
    const maxLength = ref(props.validation.maxLength || 0);
    const remainingCharacters = computed(() => maxLength.value - localValue.value.length);
    const percentFull = computed(() => (localValue.value.length / maxLength.value) * 100);

    const handleInput = (event: Event) => {
      const input = event.target as HTMLTextAreaElement;
      //localValue.value = input.value;
      emit('update:value', props.name, input.value);
    };

    watch(localValue, (newValue) => {
      //console.log('localValue', localValue.value, localValue.value.length, maxLength.value);
      if (localValue.value.length > maxLength.value) {
        localValue.value = localValue.value.slice(0, maxLength.value); // Prevent exceeding max length
      }
    });

    return {
      handleInput,
      localValue,
      remainingCharacters,
      maxLength,
      percentFull
    };
  }
});
</script>

<style scoped lang="scss">

.status-message {
  font-size: 0.8rem;
  color: #999;
}

</style>