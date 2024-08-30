<!-- Custom Drop Down Menu -->
<template>
  <div class="form-select-element">
    <ValidationMessage :validation="validation" :errors="errors" :localValue="selectedOption" />

    <label :for="name" :id="`${name}-label`">{{ label }}</label>
    <button
      type="button"
      class="select-container field-select"
      @click="toggleDropdown"
      @keydown="handleKeyPress"
      :aria-expanded="isOpen.toString()"
      role="combobox"
      aria-haspopup="listbox"
      :aria-labelledby="`${name}-label`"
      :aria-controls="`${name}-listbox`"
      tabindex="0"
    >
      <component class="option-icon" :is="getIcon(selectedOption)" />
      <span>{{ selectedOption || placeholder }}</span>
    </button>
    <ul
      v-if="isOpen"
      class="dropdown"
      role="listbox"
      :id="`${name}-listbox`"
      :aria-labelledby="`${name}-label`"
      @keydown="handleKeyPress"
      tabindex="-1"
    >
      <li
        v-for="(option, index) in options"
        :key="option"
        class="dropdown-option"
        @click="selectOption(option)"
        @blur="handleBlur"
        role="option"
        :aria-selected="option === selectedOption"
        :tabindex="index === focusedIndex.value ? '0' : '-1'"
        @focus="focusedIndex = index"
        @mousedown.prevent="focusedIndex = index"
      >
        <component class="option-icon" :is="getIcon(option)" />
        <span>{{ option }}</span>
      </li>
    </ul>
    </div>
  
</template>

<script lang="ts">

import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import ValidationMessage from '@/components/common/ValidationMessage.vue';
import IconCircle from '@/components/icons/IconCircle.vue';
import IconMountains from '@/components/icons/IconMountains.vue';
import IconDeserts from '@/components/icons/IconDeserts.vue';
import IconOceans from '@/components/icons/IconOceans.vue';

export default defineComponent({
  name: 'FormSelect',
  components: {
    IconCircle,
    IconMountains,
    IconDeserts,
    IconOceans,
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
    options: {
      type: Array as () => string[],
      required: true
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
    const isOpen = ref(false);
    const selectedOption = ref(props.value);
    const focusedIndex = ref(-1);

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
      if (isOpen.value) {
        focusedIndex.value = 0;
        updateFocusedOption();
      }
    };

    const selectOption = (option: string) => {
      selectedOption.value = option;
      emit('update:value', props.name, selectedOption.value);
      isOpen.value = false;
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      
      if (!isOpen.value) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          toggleDropdown();
        }
        focusedIndex.value = 0;
        updateFocusedOption();
        return;
      }

      console.log(event.key);
      console.log("FI-in", focusedIndex.value);
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          focusedIndex.value = (focusedIndex.value + 1) % props.options.length;
         
          console.log("FFF", focusedIndex.value);
          break;
        case 'ArrowUp':
          event.preventDefault();
          focusedIndex.value = (focusedIndex.value - 1 + props.options.length) % props.options.length;
          console.log("FFF++", focusedIndex.value);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex.value >= 0) {
            selectOption(props.options[focusedIndex.value]);
          }
          break;
        case 'Escape':
          isOpen.value = false;
          focusedIndex.value = -1;
          break;
        case 'Tab':
          isOpen.value = false;
          break;
        default:
          break;
      }
      console.log(focusedIndex.value);
      updateFocusedOption();
    };

    const updateFocusedOption = () => {
      // Update focus after arrow key press
      if (isOpen.value && focusedIndex.value >= 0) {
        const dropdown = document.getElementById(`${props.name}-listbox`);
        if (dropdown) {
          const options = dropdown.querySelectorAll<HTMLElement>('[role="option"]');
          options[focusedIndex.value]?.focus();
        }
      }

    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen.value) return;
      const target = event.target as HTMLElement;
      if (!target.closest('.form-select-element')) {
        isOpen.value = false;
      }
    };

    const handleBlur = () => {
      setTimeout(() => {
        if (!document.activeElement?.closest('.form-select-element')) {
          isOpen.value = false;
        }
      }, 0);
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      isOpen,
      selectedOption,
      focusedIndex,
      toggleDropdown,
      selectOption,
      getIcon,
      handleKeyPress,
      handleBlur,
    };
  }
});
</script>


<style lang="scss" scoped>

span {
  display: inline-block;
  line-height: 1rem;
  height: 1rem;
}

.form-select-element {
  position: relative;
  
  .select-container {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1;
    background-color: #333;
    border: 1px solid #333333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);

    .dropdown-option {
      width: calc(100% - 4px);
      margin-left: 2px;
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border: 1px solid #ccc;
      color: #666;
      background-color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover, &:focus {
        background-color: #bfbfbf;
        outline: none;
      }
    }
  }
}

.option-icon {
  margin-right: 16px;
  margin-left: 16px;
  min-width: 20px;
  
  margin-bottom: 0;
  
}
</style>