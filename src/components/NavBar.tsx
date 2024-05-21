import { Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';


export function NavBar() {
    return (
      <Fragment>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/my-menu">My Menu</Link>
          <Link to="/edit-menu">Edit Menu</Link>
          <Link to="/create-menu">Create Menu</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </Fragment>
    );
  }