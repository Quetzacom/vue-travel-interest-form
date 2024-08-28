<template>
<div class="travel-interest-form">
  <!-- Placeholder for form -->
  <h1>Travel Interest Form</h1>

  <form action="" method="post">

    <p>
    Field Value: {{ fieldValue }}
  </p>

  <input v-model="fieldInput" placeholder="Enter name" />
  <button @click="updateValue">Update</button>

  </form>
  
  <div class="profile-card">
    <ul>
      <li v-for="(value, key) in fields" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
    
  </div>

</div>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import { useFormStore } from '@/stores/useFormStore';

export default defineComponent({
  name: 'TravelInterestForm',
  setup() {
    const formStore = useFormStore();
 
    const fieldInput = ref('');
    const fieldValue = computed(() => formStore.fieldValue);

    const updateValue = () => {
      formStore.updateValue('fieldValue', fieldInput.value);
    };

    return {
      fields: formStore.fields,
      fieldValue,
      fieldInput,
      updateValue,
    };
  },
});

</script>

<style lang="scss" scoped>

.travel-interest-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;
}

.profile-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
}

</style>