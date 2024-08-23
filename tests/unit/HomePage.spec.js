import { shallowMount } from '@vue/test-utils';
import HomePage from '@/views/HomePage.vue';

describe('HomePage.vue', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(HomePage);
    expect(wrapper.exists()).toBe(true);
  });
});
