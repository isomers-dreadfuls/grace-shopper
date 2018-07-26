import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

import {StripeProvider} from 'react-stripe-elements'

const App = () => {
  return (
    <div>
      <StripeProvider apiKey="pk_test_PdTJvVNpt0qPtWbaasT8BAYN">
        <Navbar />
        <Routes />
      </StripeProvider>
    </div>
  )
}

export default App
