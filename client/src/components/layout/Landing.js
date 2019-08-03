import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Clock from 'react-live-clock';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  
  render() {
    return (
        <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
              <h1 style={{fontSize:'8vw'}}>
              <Clock className="ukFormat" format={'hh:mm:ssa'} ticking={true} timezone={'Asia/Colombo'} />
              </h1>
                <h1 className="display-3 mb-4">Hostel Management System
                </h1>
                <p className="lead"> University of Peradeniya, Sri Lanka</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing);