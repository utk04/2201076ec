import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">Social Media Analytics</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/top-users">Top Users</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/trending-posts">Trending Posts</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/feed">Feed</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
