import React, { Component } from 'react'

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
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
}
onSubmit(e){
    e.preventDefault();
    
    const newUser = {
        name:this.state.name,
        regNo: this.state.regNo,
        faculty: this.state.faculty,
        hall: this.state.hall,
        contactNo: this.state.contactNo,
        guardianName: this.state.guardianName,
        guardianTel:this.state.guardianTel,
        password :this.state.password,
        password2: this.state.password2
    };
    console.log(newUser);
}
  render() {
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
                            className="form-control form-control-lg" 
                            placeholder="Name" 
                            name="name" 
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Registration No." 
                            value={this.state.regNo}
                            name="regNo" 
                            onChange={this.onChange}
                        />
                            <small className="form-text text-muted">It should be appeared in your University identity card <br />
                            Example:S/00/000)
                            </small>
                    </div>
                    <div className="form-group">
                         <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Faculty" 
                            value={this.state.faculty}
                            name="faculty" 
                            onChange={this.onChange}
                            />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Hall" 
                            value={this.state.hall}
                            name="hall" 
                            onChange={this.onChange}
                            />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Contact No:"
                            value={this.state.contactNo}
                            name="contactNo" 
                            onChange={this.onChange}
                            />
                    </div>
                    <div className="form-group">
                         <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Guardian Name" 
                            value={this.state.guardianName}
                            name="guardianName" 
                            onChange={this.onChange}
                            />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Guardian Telephone No:" 
                            value={this.state.guardianTel}
                            name="guardianTel" 
                            onChange={this.onChange}
                            />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control form-control-lg" 
                            placeholder="Password" 
                            value={this.state.password}
                            name="password"
                            onChange={this.onChange}
                             />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control form-control-lg" 
                            placeholder="Confirm Password"
                            value={this.state.password2} 
                            name="password2"
                            onChange={this.onChange}
                             />
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


export default Register;
