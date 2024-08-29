<!-- <template>
  <div class="form-input-element">
    <label :for="name">{{ label }}</label>
    <select 
      class="field-select" 
      :name="name" 
      v-model="localValue" 
      @input="handleInput"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
  </div>
</template> -->


<!-- Custom Drop Down Menu -->
<template>
  <div class="custom-select">
    <label :for="name">{{ label }}</label>
    <div class="select-container" @click="toggleDropdown">
      <div class="field-select selected-option">
        <component class="option-icon" :is="getIcon(selectedOption)" />
        {{ selectedOption || placeholder }}</div>
      <div class="dropdown" v-if="isOpen">
        <div 
          v-for="option in options" 
          :key="option" 
          class="field-select dropdown-option" 
          @click="selectOption(option)"
        >
          <component class="option-icon" :is="getIcon(option)" />
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, watch } from 'vue';
import IconCircle from '../icons/IconCircle.vue';
import IconMountains from '../icons/IconMountains.vue';
import IconDeserts from '../icons/IconDeserts.vue';
import IconOceans from '../icons/IconOceans.vue';

export default defineComponent({
  name: 'FormSelect',
  components: {
    IconCircle,
    IconMountains,
    IconDeserts,
    IconOceans
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
    options: {
      type: Array as () => string[],
      required: true
    }
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const selectedOption = ref(props.value);
    const localValue = ref(props.value);

    const getIcon = (option: string) => {
      switch (option) {
        case 'Mountains':
          return 'IconMountains';
        case 'Oceans':
          return 'IconOceans';
        case 'Deserts':
          return 'IconDeserts';
        default:
          return 'IconCircle';
      }
    };

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (option: string) => {
      selectedOption.value = option;
      emit('update:value', option);
    };

    const handleInput = (event: Event) => {
      const input = event.target as HTMLSelectElement;
      localValue.value = input.value;
      emit('update:value', props.name, input.value);
    };

    return {
      isOpen,
      selectedOption,
      toggleDropdown,
      selectOption,
      getIcon,
      handleInput,
      localValue
    };
  }
});
</script>


<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;
  
  .select-container {

    
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .select-option {
      padding: 8px;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      border: 1px solid #000000;
      border-radius: 4px;
      background-color: #eee;
      z-index: 1000;

      .dropdown-option {
        padding: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        
        &:hover {
          background-color: #bfbfbf;
        }
      }
    }
  }
}

.option-icon {
  margin-right: 16px;
  margin-left: 16px;
  min-width: 20px;
  height: 20px;
  
}
</style>