
import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'

const showMenuMobile = createStore({
  initialState: {
    show: false
  },
  actions: {
    setShow: (show: boolean | null) => ({ setState }) => {
      setState({
        show: show || false
      })
    }
  },
  name: 'showMenuMobile',
})

export const useHookShowMenuMobile = createHook(showMenuMobile)
export const Container = createContainer(showMenuMobile, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})

export const Subscriber = createSubscriber(showMenuMobile)
