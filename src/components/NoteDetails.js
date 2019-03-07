import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import { editNote, deleteNote } from '../redux/actions'

const styles = theme => ({
  buttons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginBottom: theme.spacing.unit
  },
  textarea: {
    width: '100%',
    height: '100%',
    fontSize: '0.875rem',
    border: 'none',
    resize: 'none',
    '&:focus': {
      outline: 'none'
    }
  },
  empty: {
    marginTop: theme.spacing.unit * 2
  }
})

class NoteDetails extends React.Component {
  constructor(props) {
    super(props)
    this.textarea = React.createRef()
  }

  focusTextArea = () => {
    // Don't lose focus if we are filtering
    if (this.textarea.current && document.activeElement.nodeName !== 'INPUT') {
      this.textarea.current.focus()
    }
  }

  componentDidMount() {
    this.focusTextArea()
  }

  componentDidUpdate() {
    this.focusTextArea()
  }

  handleChange = (event) => {
    if (this.props.note.id) {
      this.props.editNote({
        id: this.props.note.id,
        text: event.target.value
      })
    }
  }

  handleDelete = () => {
    if (this.props.note.id) {
      this.props.deleteNote(this.props.note)
    }
  }

  render() {
    const { classes, hasFilter, hasParam, note } = this.props

    if (note && note.id) {
      return (
        <React.Fragment>
          <div className={classes.buttons} >
            <Link to="/" >
              <IconButton
                  className={classes.button}
                  aria-label="Delete"
                  onClick={this.handleDelete} >
                <DeleteIcon />
              </IconButton>
            </Link>
          </div>
          
          <textarea
              placeholder="Enter your note text here..."
              ref={this.textarea}
              onChange={this.handleChange}
              className={classes.textarea}
              value={note.text} />  
          </React.Fragment>
      )
    } else {
      let message
      if (hasFilter) {
        message = 'You have no notes that match that filter.'
      } else if (hasParam) {
        message = 'This note doesn\'t exist.'
      } else {
        message = 'You have no notes. Add some from the button below.'
      }
      return (
        <Typography variant="body1" className={classes.empty} data-testid="message">
          {message}
        </Typography>
      )
    }
  }
}

NoteDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  hasFilter: PropTypes.bool,
  hasParam: PropTypes.bool,
  note: PropTypes.object
}

export default compose(
  withStyles(styles),
  connect(null, { editNote, deleteNote }),
)(NoteDetails)
