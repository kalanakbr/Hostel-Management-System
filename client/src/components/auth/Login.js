import React, {
  Component
} from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'; 

class Login extends Component {
  constructor() {
    super();

    this.state = {
      regNo: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

componentDidMount() {
  if(this.props.auth.isAuthenticated){
    this.props.history.push('/dashboard');
  }
}

componentWillReceiveProps(nextProps) {
  if(nextProps.auth.isAuthenticated){
    this.props.history.push('/dashboard');
  }

  if(nextProps.errors){
    this.setState({ errors: nextProps.errors});
  }
}
  onSubmit(e){
    e.preventDefault();
    
    const userData = {
        regNo: this.state.regNo,
        password :this.state.password
    };
    this.props.loginUser(userData);
}
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
    const { errors } = this.state;
    return ( 
      <div className="login">
      <div className="container">
       <div className="row">
         <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your Hostel Management account</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" 
                   className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.regNo
                })} 
                  placeholder="Registration No: (S/00/000)" 
                  name="regNo" 
                  value={this.state.regNo}
                  onChange={this.onChange}
                  />
                  {errors.regNo && ( <div className="invalid-feedback">{errors.regNo}</div>)}
            </div>
            <div className="form-group">
              <input 
                type="password" 
                className={classnames("form-control form-control-lg", {
                  'is-invalid': errors.password
              })}  
                placeholder="Password" 
                name="password"
                value={this.state.password}
                onChange={this.onChange} 
                />
                {errors.password && ( <div className="invalid-feedback">{errors.password}</div>)}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);