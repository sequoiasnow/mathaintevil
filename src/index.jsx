import ReactDOM from 'react-dom'
import domready from 'domready'
import './root.scss'
import Navigation from './components/Navigation'

function init() {
  // Let'r rip!
  ReactDOM.render(<Navigation />, document.getElementById('nav'))
}

domready(init)
