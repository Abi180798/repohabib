import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainApp from './app/MainApp'

function App(){
  return(
    <Switch>
      <Route path="/"><MainApp/></Route>
    </Switch>
  )
}

export default App