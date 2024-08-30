
<template>
    <div v-if="showMessages" class="validation-message">
      <p>
        <transition name="fade"><span v-if="validationMessage.length > 0">{{ validationMessage }}</span></transition>
        <transition name="fade"><span v-if="showRequiredMessage" class="validation-message">
        <span v-if="validationMessage"> | </span>
        Required
      </span></transition></p>
    </div> 
</template>

<script setup lang="ts">

import { defineProps, computed } from 'vue';

const props = defineProps({
  validation: {
    type: Object,
    required: true,
  },
 
  localValue: {
    type: [String, Number, Array],
    default: '', 
  },
});

const showMessages = computed(() => {
  return showRequiredMessage || validationMessage.value.length > 0;
});

const showRequiredMessage = computed(() => {
  //If field has no content and is required, show required message
  return props.validation.required && props.localValue.toString().trim().length === 0;
});

const validationMessage = computed(() => {
  const { maxLength, minLength, number, pattern } = props.validation;
  const value: any = props.localValue;

  /* if (value.length < 1) {
    return '';
  } */
  if (typeof value === 'string' || Array.isArray(value)) {
    if (maxLength && value.length >= maxLength) {
      return `${maxLength} maximum characters`;
    }

    if (minLength && value.length < minLength) {
      return `At least ${minLength} characters required`;
    }
  }

  if (number && (isNaN(value) || isNaN(parseFloat(value)))) {
    return 'Numbers only';
  }

  return '';
});

</script>

<style scoped lang="scss">
.validation-message {
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  font-size: 12px;
  width: 100%;
  text-align: right;

  span {
    position: relative;
    
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>