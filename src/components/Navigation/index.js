import './styles.scss'

import pages from '../../../posts.js'
import Fractal from '../fractal'


const Navigation = () => (
  <div className="navigation">
    <div className="icon">
      <a href="/">
        <Fractal />
      </a>
    </div>
    <div>
      <span className="title">Posts</span>
      <ul className="pages">
        {Object.keys(pages).map((name) => (
          <li className="page-link" key={pages[name]}><a href={'/' + pages[name]}>{name}</a></li>
        ))}
      </ul>
    </div>
  </div>
)

export default Navigation
