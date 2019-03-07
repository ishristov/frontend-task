import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
})

const AppHeader = ({ classes }) => (
  <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        <Link to="/" className={classes.link}>Notes</Link>
      </Typography>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(AppHeader)