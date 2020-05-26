import React from 'react'
import ReactDOM from 'react-dom'
import Ainsley, { id } from 'ainsley'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <div className="wrapper">
      <header className="inner">
        <h2>
          <strong>Exported React Component</strong>
        </h2>
        <h3>
          <strong>Input</strong>
        </h3>
        <pre>
          <code>{'<Ainsley text="Lorem" />'}</code>
        </pre>
        <h3>
          <strong>Output</strong>
        </h3>
        <Ainsley text="Lorem" />
        <hr />
        <h2>
          <strong>Exported Function</strong>
        </h2>
        <h3>
          <strong>Input</strong>
        </h3>
        <pre>
          <code>{"{ id('ipsum') }"}</code>
        </pre>
        <h3>
          <strong>Output</strong>
        </h3>
        <output>{id('ipsum')}</output>
      </header>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
