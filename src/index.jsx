import ReactDOM from 'react-dom'
import domready from 'domready'
import './root.scss'
import App from './app'

function init() {
  let root = document.createElement('div')
  root.classList.add('root')
  document.body.appendChild(root)

  // Let'r rip!
  ReactDOM.render(<App />, root)
}

domready(init)
