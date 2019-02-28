import ReactDOM from 'react-dom'
import domready from 'domready'
import './root.scss'
import Navigation from './components/Navigation'
import Post from './components/Post'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const posts = [ 'The Tensor Product'
              , 'Direct Sum Decomposition'
              , 'Factoring Matricies'
              , 'Odd and Even Functions'
              , 'The Infinite Square Well'
              , 'The Tensor Product'
              , 'The Change of Variables Formula' ]

const routes = posts.reduce((o, key) => ({
  ...o, [key]: key.toLowerCase().split(' ').join('-')
}), {})  

const App = () => (
  <Router>
    <div>
      <Navigation routes={routes} />
      {posts.map((post) => (
        <Route key={post} path={'/' +  routes[post]} component={Post} />
      ))}
    </div>
  </Router>
)

function init() {
  // Let'r rip!
  ReactDOM.render(<App />, document.getElementById('react-root'))
}

domready(init)
