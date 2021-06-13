import 'regenerator-runtime/runtime'
import { mount, createLocalVue } from '@vue/test-utils'
import EditForm from '../src/components/modalwindow/EditForm'
import Modal from '../src/plugins/ModalWindow/index'

const localVue = createLocalVue()
localVue.use(Modal)

// mount(Modal, {
//   localVue
// })

describe('EditForm', () => {
  test('Content of the TestComponent', () => {
    const wrapper = mount(EditForm, {
      propsData: {
        item: { category: 'Food', value: 500, date: '11.06.2021' }
      }
    })


    // expect(wrapperApp.vm.modalShown).toEqual('context')

    console.log(wrapper.vm.itemList.description)
  })
})