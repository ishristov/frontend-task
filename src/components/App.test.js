import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender, fireEvent} from 'react-testing-library'
import reducer from '../redux/reducer'

import App from './App'
import { uniqueId } from '../lib/helpers'

// a handy function for all tests that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function renderConnected(
  ui,
  {initialState, store = createStore(reducer, initialState)} = {},
) {
  return {
    ...rtlRender(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

it('should render App with no notes', () => {
  const {queryByText} = renderConnected(
    <App />
  )
  expect(document.querySelector('a')).toHaveTextContent('Notes')
  expect(document.querySelector('ul')).toBeEmpty()
  expect(queryByText('You have no notes. Add some from the button below.')).toBeTruthy()

  expect(queryByText('[empty]')).toBeFalsy()
  expect(document.querySelector('textarea')).toBeFalsy()
})

it('should and add a note', () => {
  const {queryByText, getByLabelText} = renderConnected(
    <App />
  )
  fireEvent.click(getByLabelText('Add'))
  
  expect(queryByText('[empty]')).toBeTruthy()
  expect(document.querySelector('textarea')).toBeTruthy()

  expect(document.querySelector('ul')).not.toBeEmpty()
  expect(queryByText('You have no notes. Add some from the button below.')).toBeFalsy()
})

it('should edit a note', () => {
  const note = {
    id: uniqueId(),
    text: 'Some text'
  }
  const {queryByText} = renderConnected(
    <App />, {
      initialState: [note]
    }
  )

  expect(document.querySelector('ul')).toHaveTextContent(note.text)
  expect(document.querySelector('textarea')).toHaveTextContent(note.text)

  expect(queryByText('You have no notes. Add some from the button below.')).toBeFalsy()

  fireEvent.change(document.querySelector('textarea'), {target: {value: 'edited'}})
  expect(document.querySelector('ul')).toHaveTextContent('edited')
  expect(document.querySelector('textarea')).toHaveTextContent('edited')
})

it('should delete a note', () => {
  const note = {
    id: uniqueId(),
    text: 'Some text'
  }
  const {queryByText, getByLabelText} = renderConnected(
    <App />, {
      initialState: [note]
    }
  )

  expect(document.querySelector('ul')).toHaveTextContent(note.text)
  expect(document.querySelector('textarea')).toHaveTextContent(note.text)

  expect(queryByText('You have no notes. Add some from the button below.')).toBeFalsy()

  fireEvent.click(getByLabelText('Delete'))
  
  expect(queryByText('You have no notes. Add some from the button below.')).toBeTruthy()

  expect(document.querySelector('ul')).toBeEmpty()
  expect(document.querySelector('textarea')).toBeFalsy()
})

it('should filter notes', () => {
  const firstNote = {
    id: uniqueId(),
    text: 'First text'
  }
  const secondNote = {
    id: uniqueId(),
    text: 'Second text'
  }
  const {getByPlaceholderText, queryByText} = renderConnected(
    <App />, {
      initialState: [firstNote, secondNote]
    }
  )

  expect(document.querySelector('ul').children.length).toEqual(2)
  expect(document.querySelector('textarea')).toHaveTextContent(firstNote.text)

  fireEvent.change(getByPlaceholderText('Search notes'), {target: {value: 'Second'}})
  expect(document.querySelector('ul').children.length).toEqual(1)
  expect(document.querySelector('ul')).toHaveTextContent(secondNote.text)
  expect(document.querySelector('textarea')).toHaveTextContent(secondNote.text)

  fireEvent.change(getByPlaceholderText('Search notes'), {target: {value: 'non-existing'}})
  expect(document.querySelector('ul')).toBeEmpty()
  expect(document.querySelector('textarea')).toBeFalsy()
  expect(queryByText('You have no notes that match that filter.')).toBeTruthy()
})