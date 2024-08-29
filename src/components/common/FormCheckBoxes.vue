<template>
  <div class="field-checkboxes-element">
    <label class="label">{{ label }}</label>
    <div class="checkbox-container">
      <div class="checkbox-item" v-for="option in options" :key="option">
        <input class="checkbox" type="checkbox" :value="option" v-model="selectedOptions" @change="handleChange">
        <label class="checkbox-label" :key="option">{{ option }}</label>
      </div>  
    </div> 
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FormCheckBoxes',
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
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array as () => string[],
      required: true
    },
  },
  setup(props, { emit }) {
    const selectedOptions = ref(props.value);

    const handleChange = () => {
      emit('update:value', props.name, selectedOptions.value);
    };

    return {
      selectedOptions,
      handleChange
    };
  }
});
</script>

<style scoped lang="scss">

.field-checkboxes-element {
  display: block;

  .label {
    margin-right: 3px;
  }
  
  .checkbox-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 1rem;

    .checkbox-item {
      display: flex;
      align-items: center;
      padding-right: 1rem;


      .checkbox {
        transform: scale(2);
        margin-right: 1rem;
      }

      .checkbox-label {
        color: #eee;
        margin-right: 2rem;
        height: 1rem;
      }
    }
  }
}

</style>