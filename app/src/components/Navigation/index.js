import './styles.scss'

import Fractal from '../fractal'
import { Link } from 'react-router-dom'

const Navigation = ({ routes})  => (
  <div className="navigation">
    <div className="icon">
      <a href="/">
        <Fractal />
      </a>
    </div>
    <div>
    <span className="title">Posts</span>
 
    <ul className="pages">
      {Object.keys(routes).map((name) => (
        <li className="page-link" key={routes[name]}>
          <Link to={'/' + routes[name]}>{name}</Link>
        </li>
      ))}
    </ul>
    </div>
  </div>
)

export default Navigation
