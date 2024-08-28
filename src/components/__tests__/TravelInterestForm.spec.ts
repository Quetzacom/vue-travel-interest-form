//Test for TravelInterestForm component
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TravelInterestForm from '../TravelInterestForm.vue';

describe('TravelInterestForm', () => {
  // test that the component renders
  it('renders', () => {
    const wrapper = mount(TravelInterestForm);
    expect(wrapper.exists()).toBe(true);
  });
})