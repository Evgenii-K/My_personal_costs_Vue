import 'regenerator-runtime/runtime'
import { mount, createLocalVue } from '@vue/test-utils'
import EditForm from '../src/components/modalwindow/EditForm'
import Modal from '../src/plugins/ModalWindow/index'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Modal)
localVue.use(Vuex)

describe('EditForm', () => {

  let actions
  let store
  let props

  beforeEach(() => {
    props = {
      propsData: {
        item: { category: 'Food', value: 500, date: '11.06.2021' }
      }
    }

    actions = {
      editItem: jest.fn()
    }

    store = new Vuex.Store({
      actions
    })
  })

  test('Formted date', () => {
    const wrapper = mount(EditForm, props)

    expect(wrapper.vm.itemList.date).toBe('2021-06-11')
  })

  test('Call vuex', () => {
    const wrapper = mount(EditForm, props)

    const buttonAdd = wrapper.find('[name="btn__add"]')

    expect(buttonAdd.exists()).toBe(true)
    expect(buttonAdd.text()).toContain('Apply changes')
    // buttonAdd.trigger('click')

    // expect(actions.editItem).toBeCalled()
  })
})

