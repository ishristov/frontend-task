import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from './actionTypes'
import reducer from './reducer'
import { uniqueId } from '../lib/helpers'

describe('notes reducer should add, edit and delete notes', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })

  it('should handle ADD_NOTE with empty state', () => {
    const note = {
      id: uniqueId(),
      text: 'Some note'
    }

    expect(
      reducer([], {
        type: ADD_NOTE,
        payload: note
      })
    ).toEqual([note])
  })

  it('should handle ADD_NOTE with existing state', () => {
    const firstNote = {
      id: uniqueId(),
      text: 'First note'
    }

    const secondNote = {
      id: uniqueId(),
      text: 'Second note'
    }

    expect(
      reducer(
        [firstNote],
        {
          type: ADD_NOTE,
          payload: secondNote
        }
      )
    ).toEqual([firstNote, secondNote])
  })

  it('should handle EDIT_NOTE', () => {
    const note = {
      id: uniqueId(),
      text: 'Some note'
    }

    expect(
      reducer([note], {
        type: EDIT_NOTE,
        payload: {
          ...note,
          text: 'Note edited'
        }
      })
    ).toEqual([{
      id: note.id,
      text: 'Note edited'
    }])
  })

  it('should handle DELETE_NOTE', () => {
    const firstNote = {
      id: uniqueId(),
      text: 'First note'
    }

    const secondNote = {
      id: uniqueId(),
      text: 'Second note'
    }

    expect(
      reducer([firstNote, secondNote], {
        type: DELETE_NOTE,
        payload: {
          id: firstNote.id
        }
      })
    ).toEqual([secondNote])
  })
})