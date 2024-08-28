<template>
<div class="travel-interest-form">
  <!-- Placeholder for form -->
  <h1>Travel Interest Form</h1>

  <p>
    Field Value: {{ fieldValue }}
  </p>

  <input v-model="fieldInput" placeholder="Enter name" />
  <button @click="updateValue">Update</button>
</div>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import { useFormStore } from '@/stores/useFormStore';

export default defineComponent({
  setup() {
    const formStore = useFormStore();
 
    const fieldInput = ref('');
    const fieldValue = computed(() => formStore.fieldValue);

    const updateValue = () => {
      formStore.updateValue('fieldValue', fieldInput.value);
    };

    return {
      fieldValue,
      fieldInput,
      updateValue,
    };
  },
});

</script>
