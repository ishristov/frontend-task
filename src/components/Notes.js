import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer';
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'

import NoteList from './NoteList'
import NoteDetails from './NoteDetails'
import { uniqueId } from '../lib/helpers'
import { addNote } from '../redux/actions'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6
  }
});

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: ''
    }
  }

  addNoteClicked = () => {
    this.props.addNote({
      id: uniqueId(),
      text: ''
    })
    this.setState({ filterText: '' })
  }

  handleChange = (event) => {
    this.setState({ filterText: event.target.value })
  }

  getFilteredNotes = () => {
    if (this.state.filterText === '') {
      return this.props.notes
    }

    const re = new RegExp(this.state.filterText.toLowerCase())
    return this.props.notes.filter((note) => note.text.toLowerCase().match(re))
  }

  getCurrentNote = (notes = this.props.notes) => {
    const paramNoteId = this.props.match.params.noteId

    if (paramNoteId) {
      if (paramNoteId === 'last') {
        return notes[notes.length - 1] || {}
      } else {
        return notes.find((t) => t.id === paramNoteId) || {}
      }
    } else {
      return notes[0] || {}
    }
  }

  render() {
    const { classes } = this.props
    const filteredNotes = this.getFilteredNotes()
    const note = this.getCurrentNote(filteredNotes)

    return (
      <div className={classes.root}>
        <Drawer 
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar} />

          <TextField
              autoFocus
              placeholder="Search notes"
              style={{margin: '15px 20px', minHeight: 32}}
              value={this.state.filterText}
              onChange={this.handleChange}
          />
          <NoteList
              notes={filteredNotes}
              selectedNote={note}
          />

          <Link to="/last" >
            <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                onClick={this.addNoteClicked}>
              <AddIcon />
            </Fab>
          </Link>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <NoteDetails
              note={note}
              hasFilter={this.state.filterText !== ''}
              hasParam={this.props.match.params.noteId !== undefined} />
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  notes: state
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { addNote })
)(Notes)
