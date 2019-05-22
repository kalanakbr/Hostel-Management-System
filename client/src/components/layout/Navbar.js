import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() { 
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
            <a className="navbar-brand" href="https://www.pdn.ac.lk/academics/academics.php" >
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/University_of_Peradeniya_crest.png/220px-University_of_Peradeniya_crest.png" alt="logo" style={{width:'30px', height:'30px'}} ></img>
            </a>
          <Link className="navbar-brand" to="/">Hostel Management</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">Students
                </Link>
              </li>
            </ul>
    
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;