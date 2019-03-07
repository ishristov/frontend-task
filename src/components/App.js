import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import AppHeader from './AppHeader'
import Notes from './Notes'

const App = () => (
  <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/frontend-task' : ''} >
    <React.Fragment>
      <AppHeader />
      <Route path="/:noteId?" component={Notes} />
    </React.Fragment>
  </BrowserRouter>
)

export default App
