import React from 'react'
import FormScreen from './app/screens/FormScreen'
import { Provider } from 'react-redux'
import { store } from './app/store/store'

const App = () => {
  return (
    <Provider store={store}>
     <FormScreen/>
    </Provider>
  )
}

export default App

