
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

const styles = (theme) => ({
  textEllipsis: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  noDecoration: {
    textDecoration: 'none'
  }
})

const NoteItem = ({ classes, selected, note }) => (
  <Link to={'/' + note.id} className={classes.noDecoration}>
    <ListItem button selected={selected}>
      {
        note.text &&
        <ListItemText primary={note.text} classes={{primary: classes.textEllipsis}} />
      }
      {
        !note.text &&
        <ListItemText secondary="[empty]"  />
      }
      <KeyboardArrowRight color="action" />
    </ListItem>
  </Link>
)

NoteItem.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  note: PropTypes.object.isRequired
}

export default withStyles(styles)(NoteItem)