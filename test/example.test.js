import { mount } from '@vue/test-utils'
import TestComponent from './TestComponent'

describe('TestComponent', () => {
  test('Content of the TestComponent', () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        mes: 'world'
      }
    })

    expect(wrapper.text()).toEqual('Hello world')
  })
})