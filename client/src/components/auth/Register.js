import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';


class Register extends Component {
    constructor(){
        super();

        this.state = {
            name:'',
            regNo:'',
            faculty:'',
            hall:'',
            contactNo:'',
            guardianName:'',
            guardianTel:'',
            password:'',
            password2:'',
            profilePicture:'',
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

componentDidMount() {
        if(this.props.auth.isAuthenticated){
          this.props.history.push('/upload');
        }
}

componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
        this.setState({ errors: nextProps.errors});
    }
}

// fileSelectedHandler = event => {
//     this.setState({
//         profilePicture: event.target.files[0]
//     }) 
// }

// fileUploadHandler = () => {
//     const formData = new FormData()
//     formData.append(
//         'file',
//         this.state.profilePicture,
//         this.state.profilePicture.name
//         );
//     console.log(this.state.profilePicture)
// } 

onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
}

onSubmit(e){
    e.preventDefault();
    
    // const formData = new FormData()
    // formData.append(
    //     'profilePicture',
    //     this.state.profilePicture,
    //     this.state.profilePicture.name
    //     );

    const newUser = {
        name:this.state.name,
        regNo: this.state.regNo,
        faculty: this.state.faculty,
        hall: this.state.hall,
        contactNo: this.state.contactNo,
        guardianName: this.state.guardianName,
        guardianTel:this.state.guardianTel,
        profilePicture: this.state.profilePicture,
        password :this.state.password,
        password2: this.state.password2,

    };

    this.props.registerUser(newUser, this.props.history);
    // console.log(newUser);
   
}
  render() {

    const { errors } = this.state; //const errors = this.state.errors;

    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Please,Register for the university hostel management system</p>
              <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className={classnames("form-control form-control-lg", {
                                'is-invalid': errors.name
                            })} 
                            placeholder="Name" 
                            name="name" 
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                        {errors.name && ( <div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className={classnames("form-control form-control-lg", {
                                'is-invalid': errors.regNo
                            })} 
                            placeholder="Registration No." 
                            value={this.state.regNo}
                            name="regNo" 
                            onChange={this.onChange}
                        />
                        {errors.regNo && ( <div className="invalid-feedback">{errors.regNo}</div>)}
                            <small className="form-text text-muted">It should be appeared in your University identity card <br />
                            Example:S/00/000)
                            </small>
                    </div>
                    <div className="form-group">
                         <input 
                            type="text" 
                            className={classnames("form-control form-control-lg", {
                                'is-invalid': errors.faculty
                            })} 
                            placeholder="Faculty" 
                            value={this.state.faculty}
                            name="faculty" 
                            onChange={this.onChange}
                            />
                            {errors.faculty && ( <div className="invalid-feedback">{errors.faculty}</div>)}
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className={classnames("form-control form-control-lg", {
                                'is-invalid': errors.hall
                            })}  
                            placeholder="Hall" 
                            value={this.state.hall}
                            name="hall" 
                            onChange={this.onChange}
                            />
                            {errors.hall && ( <div className="invalid-feedback">{errors.hall}</div>)}
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className={classnames("form-control form-control-lg", {
                                'is-invalid': errors.contactNo
                            })} 
                            placeholder="Contact No:"
                            value={this.state.contactNo}
                            name="contactNo" 
                            onChange={this.onChange}
                            />
                            {errors.contactNo && ( <div className="invalid-feedback">{errors.contactNo}</div>)}
                    </div>
                    <div className="form-group">
                         <input 
                            type="text" 
                            className={classnames("form-control form-control-lg", {
                                'is-invalid': errors.guardianName
                            })} 
                            placeholder="Guardian Name" 
                            value={this.state.guardianName}
                            name="guardianName" 
                            onChange={this.onChange}
                            />
                            {errors.guardianName && ( <div className="invalid-feedback">{errors.guardianName}</div>)}
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className={classnames("form-control form-control-lg", {
                                'is-invalid': errors.guardianTel
                            })} 
                            placeholder="Guardian Telephone No:" 
                            value={this.state.guardianTel}
                            name="guardianTel" 
                            onChange={this.onChange}
                            />
                            {errors.guardianTel && ( <div className="invalid-feedback">{errors.guardianTel}</div>)}
                    </div>
                    
                    {/* <div className="form-group"> 
                        <input 
                            className={classnames("form-control form-control-lg mb-2")} id="customFile"
                            type="file" 
                            name="profilePicture"
                            placeholder="Picture"
                            onChange={this.fileSelectedHandler}/> */}
                            {/* <label className={classnames("form-control form-control-lg")} htmlFor="customFile"></label> */}
                            {/* <button 
                            onClick={this.fileUploadHandler}className={classnames("btn btn-primary btn-block mb-2")}>Upload</button> */}
                    {/* </div> */}
                    <div className="form-group">
                        <input 
                            type="password" 
                            className={classnames("form-control form-control-lg", {
                                'is-invalid': errors.password
                            })}  
                            placeholder="Password" 
                            value={this.state.password}
                            name="password"
                            onChange={this.onChange}
                             />
                             {errors.password && ( <div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className={classnames("form-control form-control-lg", {
                                'is-invalid': errors.password2
                            })} 
                            placeholder="Confirm Password"
                            value={this.state.password2} 
                            name="password2"
                            onChange={this.onChange}
                             />
                             {errors.password2 && ( <div className="invalid-feedback">{errors.password2}</div>)}
                    </div>
                      <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
