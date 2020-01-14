import React from 'react'

import {Navbar, Sidebar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="belowNavDiv">
        <Sidebar />
        <Routes />
      </div>
    </div>
  )
}

export default App
