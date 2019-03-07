import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_NOTE: {
      return [...state, action.payload]
    }

    case EDIT_NOTE: {
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            ...action.payload
          }
        }
        return note
      })
    }

    case DELETE_NOTE: {
      return state.filter((note) => note.id !== action.payload.id)
    }

    default:
      return state
  }
}