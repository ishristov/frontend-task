import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import NoteItem from './NoteItem'

const NoteList = ({ notes, selectedNote }) => (
  <List>
    {notes.map((note) => (
      <NoteItem
          note={note}
          key={note.id}
          selected={note.id === selectedNote.id}
      />
    ))}
  </List>
)

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  selectedNote: PropTypes.object.isRequired
}

export default NoteList
