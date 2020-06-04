import React from 'react'
import ReactDOM from 'react-dom'
import { generate, embed } from 'ainsley'
import getAinsley from 'ainsley/macro'

import App from './App'

embed(generate(getAinsley('styles.ainsley')))
document.body.style.visibility = ''

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
