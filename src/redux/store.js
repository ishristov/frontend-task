import { throttle } from 'lodash'
import { createStore } from 'redux'

import reducer from './reducer'

const initialState = JSON.parse(localStorage.getItem('reactnotes')) || []

const store = createStore(
  reducer,
  initialState
)

store.subscribe(throttle(() => {
  localStorage.setItem('reactnotes', JSON.stringify(store.getState()))
}, 1000))

export default store